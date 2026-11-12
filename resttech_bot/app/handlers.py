import json
from aiogram import F, Router
from aiogram.filters import Command, CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.types import Message, CallbackQuery
from sqlalchemy import select
from .config import settings
from .db import Session, User, Product, Lead
from .keyboards import main_menu, choices, product_actions
from .states import LeadForm, SellForm, ProjectForm, ProductContact

router = Router()
CATEGORIES = ["Тепловое", "Холодильное", "Электромеханическое", "Посудомоечное", "Барное", "Нейтральное", "Комплексное оснащение", "Пока не знаю"]
BUDGETS = ["До 50 000 ₽", "50–150 тыс. ₽", "150–300 тыс. ₽", "300–500 тыс. ₽", "500 тыс. – 1 млн ₽", "Более 1 млн ₽", "Нужна консультация"]

async def save_lead(message: Message, lead_type: str, data: dict):
    async with Session() as session:
        session.add(Lead(telegram_id=message.from_user.id, lead_type=lead_type,
                         payload=json.dumps(data, ensure_ascii=False)))
        await session.commit()
    if settings.admin_chat_id:
        user = message.from_user
        body = "\n".join(f"<b>{k}</b>: {v}" for k, v in data.items())
        await message.bot.send_message(settings.admin_chat_id,
            f"📩 <b>Новая заявка RestTech #{lead_type}</b>\n"
            f"Клиент: {user.full_name} (@{user.username or 'нет username'})\n"
            f"Telegram ID: <code>{user.id}</code>\n{body}", parse_mode="HTML")

@router.message(CommandStart())
async def start(message: Message, state: FSMContext):
    await state.clear()
    async with Session() as session:
        user = await session.scalar(select(User).where(User.telegram_id == message.from_user.id))
        if not user:
            session.add(User(telegram_id=message.from_user.id,
                             username=message.from_user.username,
                             full_name=message.from_user.full_name))
            await session.commit()
    await message.answer(
        "Здравствуйте! Это <b>RestTech</b> — помощник по подбору, покупке и продаже "
        "профессионального оборудования для HoReCa.\n\nВыберите, что вам нужно:",
        reply_markup=main_menu(), parse_mode="HTML")

@router.message(F.text == "🔎 Подобрать оборудование")
async def start_buy(message: Message, state: FSMContext):
    await state.set_state(LeadForm.object_type)
    await message.answer("Для какого объекта подбираем оборудование?",
        reply_markup=choices(["Ресторан","Кафе","Бар","Пекарня","Кофейня","Столовая","Другое"]))

@router.message(F.text.in_({"🆕 Купить новое","♻️ Купить б/у"}))
async def catalog(message: Message):
    condition = "new" if message.text.startswith("🆕") else "used"
    async with Session() as session:
        products = (await session.scalars(select(Product).where(
            Product.active.is_(True), Product.condition == condition).order_by(Product.id.desc()).limit(20))).all()
    if not products:
        await message.answer("Пока нет опубликованных предложений в этом разделе. Оставьте запрос через «Подобрать оборудование» — найдём варианты у поставщиков.")
        return
    for p in products:
        price = f"{p.price:,} ₽".replace(",", " ") if p.price else "Цена по запросу"
        caption = f"<b>{p.title}</b>\nКатегория: {p.category}\nПроизводитель: {p.brand or 'не указан'}\nЦена: {price}\nГород: {p.city or 'уточняется'}\n\n{p.description or ''}"
        if p.photo_file_id:
            await message.answer_photo(p.photo_file_id, caption=caption, reply_markup=product_actions(p.id), parse_mode="HTML")
        else:
            await message.answer(caption, reply_markup=product_actions(p.id), parse_mode="HTML")

@router.callback_query(F.data.startswith("product:"))
async def product_request(callback: CallbackQuery, state: FSMContext):
    product_id = int(callback.data.split(":")[1])
    await callback.answer()
    await callback.message.answer("Оставьте телефон или Telegram для связи.")
    await callback.message.bot_data.setdefault("product_interest", {})[callback.from_user.id] = product_id
    await state.update_data(product_id=product_id)\n    await state.set_state(ProductContact.waiting)
    # The next text message is captured by the product contact handler.

@router.message(ProductContact.waiting)
async def product_contact(message: Message, state: FSMContext):
    product_id = (await state.get_data()).get("product_id")
    await save_lead(message, "product_interest", {"product_id": product_id, "contact": message.text})
    await state.clear()
    await message.answer("Спасибо! Запрос по товару передан специалисту RestTech.", reply_markup=main_menu())

@router.callback_query(F.data.startswith("answer:"))
async def answer(callback: CallbackQuery, state: FSMContext):
    value = callback.data.removeprefix("answer:")
    current = await state.get_state()
    await state.update_data(last_answer=value)
    if current == LeadForm.object_type.state:
        await state.update_data(object_type=value); await state.set_state(LeadForm.category)
        await callback.message.edit_text("Какая категория оборудования нужна?", reply_markup=choices(CATEGORIES))
    elif current == LeadForm.category.state:
        await state.update_data(category=value); await state.set_state(LeadForm.item)
        await callback.message.edit_text("Что именно ищете? Напишите модель или задачу.")
    elif current == LeadForm.condition.state:
        await state.update_data(condition=value); await state.set_state(LeadForm.budget)
        await callback.message.edit_text("Какой бюджет?", reply_markup=choices(BUDGETS))
    elif current == LeadForm.budget.state:
        await state.update_data(budget=value); await state.set_state(LeadForm.city)
        await callback.message.edit_text("В каком городе требуется оборудование?")
    elif current == LeadForm.deadline.state:
        await state.update_data(deadline=value); await state.set_state(LeadForm.contact)
        await callback.message.edit_text("Оставьте телефон или Telegram для связи.")
    elif current == ProjectForm.object_type.state:
        await state.update_data(object_type=value); await state.set_state(ProjectForm.stage)
        await callback.message.edit_text("На какой стадии проект?", reply_markup=choices(["Планирую","Есть помещение","Есть проект","Идёт ремонт","Заведение работает"]))
    elif current == ProjectForm.stage.state:
        await state.update_data(stage=value); await state.set_state(ProjectForm.scope)
        await callback.message.edit_text("Что требуется?", reply_markup=choices(["Полное оснащение","Кухня","Бар","Замена оборудования","Отдельные позиции"]))
    elif current == ProjectForm.scope.state:
        await state.update_data(scope=value); await state.set_state(ProjectForm.budget)
        await callback.message.edit_text("Какой бюджет?", reply_markup=choices(BUDGETS))
    elif current == ProjectForm.budget.state:
        await state.update_data(budget=value); await state.set_state(ProjectForm.city)
        await callback.message.edit_text("В каком городе объект?")
    elif current == ProjectForm.deadline.state:
        await state.update_data(deadline=value); await state.set_state(ProjectForm.contact)
        await callback.message.edit_text("Оставьте телефон или Telegram для связи.")
    else:
        await callback.answer("Этот шаг уже завершён", show_alert=True)
        return
    await callback.answer()

@router.message(LeadForm.item)
async def lead_item(message: Message, state: FSMContext):
    await state.update_data(item=message.text); await state.set_state(LeadForm.condition)
    await message.answer("Рассматриваете новое или б/у?", reply_markup=choices(["Новое","Б/у","Оба варианта"]))

@router.message(LeadForm.city)
async def lead_city(message: Message, state: FSMContext):
    await state.update_data(city=message.text); await state.set_state(LeadForm.deadline)
    await message.answer("Когда нужно оборудование?", reply_markup=choices(["Срочно","В течение недели","В течение месяца","Пока изучаю варианты"]))

@router.message(LeadForm.contact)
async def lead_contact(message: Message, state: FSMContext):
    data = await state.get_data(); data["contact"] = message.text
    await save_lead(message, "equipment_request", data); await state.clear()
    await message.answer("Спасибо! Заявка передана специалисту RestTech. Мы свяжемся с вами.", reply_markup=main_menu())

@router.message(F.text == "💰 Продать оборудование")
async def sell_start(message: Message, state: FSMContext):
    await state.set_state(SellForm.title)
    await message.answer("Что хотите продать? Напишите название оборудования.")

@router.message(SellForm.title)
async def sell_title(message: Message, state: FSMContext):
    await state.update_data(title=message.text); await state.set_state(SellForm.brand_model)
    await message.answer("Укажите производителя и модель (если известны).")

@router.message(SellForm.brand_model)
async def sell_brand(message: Message, state: FSMContext):
    await state.update_data(brand_model=message.text); await state.set_state(SellForm.year)
    await message.answer("Год выпуска или покупки? Если неизвестен — так и напишите.")

@router.message(SellForm.year)
async def sell_year(message: Message, state: FSMContext):
    await state.update_data(year=message.text); await state.set_state(SellForm.condition)
    await message.answer("Опишите состояние оборудования.")

@router.message(SellForm.condition)
async def sell_condition(message: Message, state: FSMContext):
    await state.update_data(condition=message.text); await state.set_state(SellForm.faults)
    await message.answer("Есть ли неисправности?")

@router.message(SellForm.faults)
async def sell_faults(message: Message, state: FSMContext):
    await state.update_data(faults=message.text); await state.set_state(SellForm.price)
    await message.answer("Желаемая цена в рублях?")

@router.message(SellForm.price)
async def sell_price(message: Message, state: FSMContext):
    await state.update_data(price=message.text); await state.set_state(SellForm.city)
    await message.answer("В каком городе находится оборудование?")

@router.message(SellForm.city)
async def sell_city(message: Message, state: FSMContext):
    await state.update_data(city=message.text); await state.set_state(SellForm.photos)
    await message.answer("Пришлите фотографии оборудования (можно несколькими сообщениями), затем нажмите «Готово».")

@router.message(SellForm.photos, F.photo)
async def sell_photo(message: Message, state: FSMContext):
    data = await state.get_data(); photos = data.get("photos", [])
    photos.append(message.photo[-1].file_id); await state.update_data(photos=photos)
    await message.answer(f"Фото добавлено ({len(photos)}). Когда закончите, нажмите «Готово».")

@router.message(SellForm.photos, F.text.casefold() == "готово")
async def sell_done(message: Message, state: FSMContext):
    await state.set_state(SellForm.contact)
    await message.answer("Оставьте телефон или Telegram для связи.")

@router.message(SellForm.photos)
async def sell_photo_hint(message: Message):
    await message.answer("Пожалуйста, отправьте фотографию или напишите «Готово».")

@router.message(SellForm.contact)
async def sell_contact(message: Message, state: FSMContext):
    data = await state.get_data(); data["contact"] = message.text
    await save_lead(message, "sell_equipment", data); await state.clear()
    await message.answer("Спасибо! Предложение принято на модерацию. Специалист RestTech свяжется с вами.", reply_markup=main_menu())

@router.message(F.text == "🏗 Укомплектовать ресторан")
async def project_start(message: Message, state: FSMContext):
    await state.set_state(ProjectForm.object_type)
    await message.answer("Какой объект планируете оснащать?", reply_markup=choices(["Ресторан","Кафе","Бар","Пекарня","Кофейня","Столовая","Другое"]))

@router.message(ProjectForm.city)
async def project_city(message: Message, state: FSMContext):
    await state.update_data(city=message.text); await state.set_state(ProjectForm.deadline)
    await message.answer("Когда нужно реализовать проект?", reply_markup=choices(["Срочно","В течение месяца","1–3 месяца","Позже"]))

@router.message(ProjectForm.contact)
async def project_contact(message: Message, state: FSMContext):
    data = await state.get_data(); data["contact"] = message.text
    await save_lead(message, "restaurant_equipment", data); await state.clear()
    await message.answer("Спасибо! Запрос на комплектацию передан Павлу.", reply_markup=main_menu())

@router.message(F.text == "🛠 Сервис и ремонт")
async def service_start(message: Message):
    await message.answer("Опишите оборудование, неисправность и город. Специалист RestTech поможет найти сервисного партнёра.")

@router.message(F.text == "👨‍💼 Связаться с экспертом")
async def expert(message: Message):
    await message.answer("Напишите ваш вопрос следующим сообщением или оставьте контакт. Специалист RestTech свяжется с вами.")

@router.message(F.text == "ℹ️ О RestTech")
async def about(message: Message):
    text = "RestTech — помощник по подбору, покупке и продаже профессионального оборудования для HoReCa. Новое и б/у, экспертный подбор, комплектация и сервис."
    if settings.channel_url: text += f"\n\nНаш канал: {settings.channel_url}"
    await message.answer(text)
