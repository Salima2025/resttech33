from aiogram.fsm.state import State, StatesGroup

class LeadForm(StatesGroup):
    object_type = State()
    category = State()
    item = State()
    condition = State()
    budget = State()
    city = State()
    deadline = State()
    contact = State()

class SellForm(StatesGroup):
    title = State()
    brand_model = State()
    year = State()
    condition = State()
    faults = State()
    price = State()
    city = State()
    photos = State()
    contact = State()

class ProjectForm(StatesGroup):
    object_type = State()
    stage = State()
    scope = State()
    budget = State()
    city = State()
    deadline = State()
    contact = State()
