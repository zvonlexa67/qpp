from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # App
    APP_NAME: str = "QPP API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Database
    POSTGRES_USER: str = "qpp_user"
    POSTGRES_PASSWORD: str = "qpp_password"
    POSTGRES_DB: str = "qpp_db"
    POSTGRES_HOST: str = "postgres"
    POSTGRES_PORT: int = 5432
    
    @property
    def database_url(self) -> str:
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    
    # CORS
    CORS_ORIGINS: str = "http://localhost:9000,http://localhost:8080,http://127.0.0.1:9000,http://127.0.0.1:8080"
    
    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
