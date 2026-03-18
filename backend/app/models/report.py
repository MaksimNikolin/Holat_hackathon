from sqlalchemy import TIMESTAMP, Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.database import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"), nullable=False)
    status = Column(String(20), nullable=False)
    comment = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())

    photos = relationship("ReportPhoto", back_populates="report", cascade="all, delete-orphan")


class ReportPhoto(Base):
    __tablename__ = "report_photos"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    report_id = Column(Integer, ForeignKey("reports.id", ondelete="CASCADE"), nullable=False)
    photo_url = Column(Text, nullable=False)

    report = relationship("Report", back_populates="photos")
