from sqlalchemy import Column, Integer, Numeric, String
from sqlalchemy.orm import relationship

from app.db.database import Base

from .promise import Promise


class School(Base):
    __tablename__ = "schools"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    latitude = Column(Numeric)
    longitude = Column(Numeric)
    photo_url = Column(String)

    promises = relationship(Promise, back_populates="school")
