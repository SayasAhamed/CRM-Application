from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models.models import Note
from schemas.schemas import NoteCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/notes")
def create_note(note: NoteCreate, db: Session = Depends(get_db)):
    new_note = Note(**note.dict())
    db.add(new_note)
    db.commit()
    return new_note


@router.get("/notes/{lead_id}")
def get_notes(lead_id: int, db: Session = Depends(get_db)):
    return db.query(Note).filter(Note.lead_id == lead_id).all()