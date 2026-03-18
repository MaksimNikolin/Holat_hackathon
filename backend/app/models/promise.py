from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.db.database import Base


class Promise(Base):
    __tablename__ = "promises"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id"))
    description = Column(Text)
    status = Column(String(20), default="Pending")

    school = relationship("School", back_populates="promises")
