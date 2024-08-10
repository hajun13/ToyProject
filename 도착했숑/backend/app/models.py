from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from .database import Base

class Registration(Base):
    __tablename__ = "registrations"

    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String, index=True)
    birthdate = Column(String)
    grade_or_position = Column(String)
    church = Column(String)
    phone = Column(String)
    registered_at = Column(DateTime(timezone=True), server_default=func.now())
    is_checked_in = Column(Boolean, default=False)
