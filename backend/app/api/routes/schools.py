from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.school import School
from app.services.school_service import get_school, get_schools

router = APIRouter()


@router.get("/", response_model=list[School])
def list_schools(db: Session = Depends(get_db)):
    return get_schools(db)


@router.get("/{school_id}", response_model=School)
def school_detail(school_id: int, db: Session = Depends(get_db)):
    return get_school(db, school_id)
