from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, ReplyKeyboardMarkup, KeyboardButton

def main_menu():
    return ReplyKeyboardMarkup(keyboard=[
        [KeyboardButton(text="🔎 Подобрать оборудование"), KeyboardButton(text="🆕 Купить новое")],
        [KeyboardButton(text="♻️ Купить б/у"), KeyboardButton(text="💰 Продать оборудование")],
        [KeyboardButton(text="🏗 Укомплектовать ресторан"), KeyboardButton(text="🛠 Сервис и ремонт")],
        [KeyboardButton(text="👨‍💼 Связаться с экспертом"), KeyboardButton(text="ℹ️ О RestTech")],
    ], resize_keyboard=True)

def choices(items):
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text=x, callback_data=f"answer:{x}")] for x in items
    ])

def product_actions(product_id: int):
    return InlineKeyboardMarkup(inline_keyboard=[[
        InlineKeyboardButton(text="Запросить предложение", callback_data=f"product:{product_id}")
    ]])
