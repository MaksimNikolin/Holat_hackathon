from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import dashboard, reports, schools

app = FastAPI(title="CivicLens API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(schools.router, prefix="/schools", tags=["Schools"])
app.include_router(reports.router, prefix="/reports", tags=["Reports"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
