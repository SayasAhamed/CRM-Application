from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models.models import Lead
from schemas.schemas import LeadCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/leads")
def create_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    new_lead = Lead(**lead.dict())
    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)
    return new_lead


@router.get("/leads")
def get_leads(db: Session = Depends(get_db)):
    return db.query(Lead).all()


@router.put("/leads/{lead_id}")
def update_lead(lead_id: int, updated: LeadCreate, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    for key, value in updated.dict().items():
        setattr(lead, key, value)

    db.commit()
    return lead


@router.delete("/leads/{lead_id}")
def delete_lead(lead_id: int, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    db.delete(lead)
    db.commit()
    return {"message": "Deleted"}