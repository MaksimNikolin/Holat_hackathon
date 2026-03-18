from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.report import Report
from app.models.school import School

router = APIRouter()


@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    """
    Возвращает статистику для дашборда:
    - total_reports: всего отчетов
    - completed_reports: количество завершенных
    - problem_reports: количество с проблемами
    """
    total_reports = db.query(func.count(Report.id)).scalar()
    completed_reports = (
        db.query(func.count(Report.id)).filter(Report.status == "Completed").scalar()
    )
    problem_reports = db.query(func.count(Report.id)).filter(Report.status == "Problem").scalar()

    return {
        "total_reports": total_reports,
        "completed_reports": completed_reports,
        "problem_reports": problem_reports,
    }


@router.get("/problematic_schools")
def get_problematic_schools(db: Session = Depends(get_db)):
    """
    Возвращает список школ с количеством проблемных отчетов
    """
    problematic = (
        db.query(School.id, School.name, func.count(Report.id).label("problem_count"))
        .join(Report, School.id == Report.school_id)
        .filter(Report.status == "Problem")
        .group_by(School.id)
        .order_by(func.count(Report.id).desc())
        .all()
    )

    return [
        {"school_id": row.id, "school_name": row.name, "problem_count": row.problem_count}
        for row in problematic
    ]
