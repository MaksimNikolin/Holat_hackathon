from sqlalchemy.orm import Session

from app.models.school import School


def get_schools(db: Session):
    return db.query(School).all()


def get_school(db: Session, school_id: int):
    return db.query(School).filter(School.id == school_id).first()
