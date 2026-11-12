from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    bot_token: str
    admin_chat_id: int | None = None
    database_url: str = "sqlite+aiosqlite:///./resttech.db"
    channel_url: str | None = None
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
