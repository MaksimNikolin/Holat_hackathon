from sqlalchemy.orm import Session

from app.models.report import Report, ReportPhoto
from app.schemas.report import ReportCreate, ReportPhotoCreate


def get_reports(db: Session):
    return db.query(Report).all()


def create_report(db: Session, report: ReportCreate):
    db_report = Report(school_id=report.school_id, status=report.status, comment=report.comment)
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report


def get_report_photos(db: Session, report_id: int):
    return db.query(ReportPhoto).filter(ReportPhoto.report_id == report_id).all()


def create_report_photo(db: Session, photo: ReportPhotoCreate):
    db_photo = ReportPhoto(**photo.dict())
    db.add(db_photo)
    db.commit()
    db.refresh(db_photo)
    return db_photo
