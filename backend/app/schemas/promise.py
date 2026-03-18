from pydantic import BaseModel


class Promise(BaseModel):
    id: int
    description: str
    status: str

    class Config:
        orm_mode = True
