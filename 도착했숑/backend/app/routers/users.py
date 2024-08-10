from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List  # List를 typing에서 임포트
from .. import crud, models, schemas
from ..database import SessionLocal

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=schemas.Registration)
def register_user(registration: schemas.RegistrationCreate, db: Session = Depends(get_db)):
    return crud.create_registration(db=db, registration=registration)

@router.get("/registrations", response_model=List[schemas.Registration])
def get_registrations(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    registrations = crud.get_registrations(db=db, skip=skip, limit=limit)
    return registrations

@router.patch("/registrations/{registration_id}/checkin", response_model=schemas.Registration)
def update_checkin_status(registration_id: int, checkin_data: schemas.CheckInUpdate, db: Session = Depends(get_db)):
    registration = crud.get_registration(db, registration_id=registration_id)
    if not registration:
        raise HTTPException(status_code=404, detail="Registration not found")
    registration.is_checked_in = checkin_data.is_checked_in
    db.commit()
    db.refresh(registration)
    return registration

@router.put("/registrations/{registration_id}", response_model=schemas.Registration)
def update_registration(registration_id: int, updated_data: schemas.RegistrationCreate, db: Session = Depends(get_db)):
    registration = crud.get_registration(db, registration_id=registration_id)
    if not registration:
        raise HTTPException(status_code=404, detail="Registration not found")

    for key, value in updated_data.dict().items():
        setattr(registration, key, value)

    db.commit()
    db.refresh(registration)
    return registration


