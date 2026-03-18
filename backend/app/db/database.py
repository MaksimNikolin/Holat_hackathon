import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Подключение к локальной БД с ролью ggang
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://ggang@localhost:5432/civiclens")

# Создаём движок SQLAlchemy
engine = create_engine(
    DATABASE_URL,
    connect_args={},  # для psycopg2 аргументы не нужны
)

# Сессия для работы с БД
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Базовый класс для моделей
Base = declarative_base()


# Генератор сессий для FastAPI Depends
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
