from typing import List, Optional

from pydantic import BaseModel


class ReportPhotoBase(BaseModel):
    photo_url: str


class ReportPhotoCreate(ReportPhotoBase):
    report_id: int


class ReportPhoto(ReportPhotoBase):
    id: int

    class Config:
        from_attributes = True


class ReportBase(BaseModel):
    school_id: int
    status: str
    comment: Optional[str] = None


class ReportCreate(ReportBase):
    pass


class Report(ReportBase):
    id: int
    photos: List[ReportPhoto] = []

    class Config:
        from_attributes = True
