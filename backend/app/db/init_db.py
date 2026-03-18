from app.db.database import SessionLocal
from app.models.promise import Promise
from app.models.school import School


def seed():
    db = SessionLocal()

    school1 = School(name="School No45", latitude=41.3100, longitude=69.2787)

    school1.promises = [
        Promise(description="Toilet renovation"),
        Promise(description="Soap dispensers"),
        Promise(description="New desks"),
    ]

    db.add(school1)
    db.commit()
    db.close()


if __name__ == "__main__":
    seed()
