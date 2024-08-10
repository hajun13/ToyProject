from pydantic import BaseModel
from datetime import datetime, date


class RegistrationCreate(BaseModel):
    student_name: str
    birthdate: date
    grade_or_position: str
    church: str
    phone: str

    class Config:
        orm_mode = True


class Registration(BaseModel):
    id: int
    student_name: str
    birthdate: date
    grade_or_position: str
    church: str
    phone: str
    registered_at: datetime
    is_checked_in: bool

    class Config:
        orm_mode = True

class CheckInUpdate(BaseModel):
    is_checked_in: bool