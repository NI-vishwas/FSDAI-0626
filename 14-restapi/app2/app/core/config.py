import os
from datetime import timedelta
from urllib.parse import quote_plus

from dotenv import load_dotenv

load_dotenv()


class BaseConfig:
    SECRET_KEY = os.getenv("SECRET_KEY", "")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "")

    DB_USER = os.getenv("DB_USER", "")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "")
    DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
    DB_PORT = os.getenv("DB_PORT", "3306")
    DB_NAME = os.getenv("DB_NAME", "")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{quote_plus(DB_USER)}:{quote_plus(DB_PASSWORD)}"
        f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 280,
    }

    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_SAMESITE = "Lax"
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_COOKIE_SECURE = True
    JWT_COOKIE_CSRF_PROTECT = True

    CORS_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "").split(",") if o.strip()]
    RATELIMIT_DEFAULT = os.getenv("RATELIMIT_DEFAULT", "200 per day;50 per hour").split(";")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(
        minutes=int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES_MIN", "30"))
    )
    FORCE_HTTPS = os.getenv("FORCE_HTTPS", "False").lower() == "true"

    @classmethod
    def validate(cls):
        if not cls.SECRET_KEY or len(cls.SECRET_KEY) < 32:
            raise RuntimeError("SECRET_KEY must be set and be at least 32 characters")
        if not cls.JWT_SECRET_KEY or len(cls.JWT_SECRET_KEY) < 32:
            raise RuntimeError("JWT_SECRET_KEY must be set and be at least 32 characters")
        if not cls.DB_USER or not cls.DB_PASSWORD or not cls.DB_NAME:
            raise RuntimeError("Database credentials are not fully configured")
        if not cls.CORS_ORIGINS:
            raise RuntimeError("CORS_ORIGINS must include at least one trusted origin")


class DevelopmentConfig(BaseConfig):
    DEBUG = os.getenv("FLASK_DEBUG", "True").lower() == "true"


class ProductionConfig(BaseConfig):
    DEBUG = False


CONFIG_MAP = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
}


def get_config():
    env = os.getenv("FLASK_ENV", "development").lower()
    config_class = CONFIG_MAP.get(env, DevelopmentConfig)
    config_class.validate()
    return config_class
