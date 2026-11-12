import json
from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message
from sqlalchemy import select
from .config import settings
from .db import Session, Product, Lead

router = Router()

def is_admin(message: Message) -> bool:
    return bool(settings.admin_chat_id and message.from_user.id == settings.admin_chat_id)

@router.message(Command("add_product"))
async def add_product(message: Message):
    if not is_admin(message):
        return
    # /add_product new|category|title|price|city|brand|description
    raw = message.text.partition(" ")[2]
    parts = raw.split("|", 7)
    if len(parts) != 7 or parts[0] not in {"new", "used"}:
        await message.answer("Формат:\n/add_product new|used|категория|название|цена_числом|город|бренд|описание")
        return
    condition, category, title, price, city, brand, description = parts
    try:
        price_value = int(price) if price.strip() else None
    except ValueError:
        await message.answer("Цена должна быть числом в рублях или пустой.")
        return
    async with Session() as session:
        session.add(Product(condition=condition, category=category, title=title,
                            price=price_value, city=city or None, brand=brand or None,
                            description=description, active=True))
        await session.commit()
    await message.answer("Товар добавлен в каталог.")

@router.message(Command("leads"))
async def list_leads(message: Message):
    if not is_admin(message):
        return
    async with Session() as session:
        leads = (await session.scalars(select(Lead).order_by(Lead.id.desc()).limit(10))).all()
    if not leads:
        await message.answer("Заявок пока нет.")
        return
    text = "\n\n".join(f"#{x.id} · {x.lead_type} · {x.status}\n{json.dumps(json.loads(x.payload), ensure_ascii=False)}" for x in leads)
    await message.answer(text[:4000])
