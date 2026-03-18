from typing import List

from pydantic import BaseModel

from .promise import Promise


class School(BaseModel):
    id: int
    name: str
    latitude: float
    longitude: float
    promises: List[Promise] = []

    class Config:
        orm_mode = True
