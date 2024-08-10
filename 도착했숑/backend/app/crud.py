from sqlalchemy.orm import Session
from . import models, schemas

def create_registration(db: Session, registration: schemas.RegistrationCreate):
    db_registration = models.Registration(
        student_name=registration.student_name,
        birthdate=registration.birthdate,
        grade_or_position=registration.grade_or_position,
        church=registration.church,
        phone=registration.phone,
    )
    db.add(db_registration)
    db.commit()
    db.refresh(db_registration)
    return db_registration

def get_registrations(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Registration).offset(skip).limit(limit).all()

def get_registration(db: Session, registration_id: int):
    return db.query(models.Registration).filter(models.Registration.id == registration_id).first()
