from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.report import Report, ReportCreate, ReportPhoto, ReportPhotoCreate
from app.services.report_service import (
    create_report,
    create_report_photo,
    get_report_photos,
    get_reports,
)

router = APIRouter()


@router.get("/", response_model=list[Report])
def list_reports(db: Session = Depends(get_db)):
    return get_reports(db)


@router.post("/", response_model=Report)
def add_report(report: ReportCreate, db: Session = Depends(get_db)):
    return create_report(db, report)


@router.get("/photos/{report_id}", response_model=list[ReportPhoto])
def list_report_photos(report_id: int, db: Session = Depends(get_db)):
    return get_report_photos(db, report_id)


@router.post("/photos", response_model=ReportPhoto)
def add_report_photo(photo: ReportPhotoCreate, db: Session = Depends(get_db)):
    return create_report_photo(db, photo)
