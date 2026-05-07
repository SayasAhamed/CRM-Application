from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from database import SessionLocal
from models.models import Note, Lead
from schemas.schemas import NoteCreate


router = APIRouter(
    prefix="/notes",
    tags=["Notes"]
)


# =========================================
# DATABASE
# =========================================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# =========================================
# GET NOTES
# =========================================

@router.get("/{lead_id}")
def get_notes(
    lead_id: int,
    db: Session = Depends(get_db)
):

    notes = db.query(Note).filter(
        Note.lead_id == lead_id
    ).all()

    return notes


# =========================================
# ADD NOTE
# =========================================

@router.post("/")
def create_note(
    data: NoteCreate,
    db: Session = Depends(get_db)
):

    lead = db.query(Lead).filter(
        Lead.id == data.lead_id
    ).first()

    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    note = Note(

        content=data.content,

        created_by=data.created_by,

        created_at=datetime.utcnow(),

        lead_id=data.lead_id
    )

    db.add(note)

    db.commit()

    db.refresh(note)

    return note

# =========================================
# UPDATE NOTE
# =========================================

@router.put("/{note_id}")
def update_note(
    note_id: int,
    data: dict,
    db: Session = Depends(get_db)
):

    note = db.query(Note).filter(
        Note.id == note_id
    ).first()

    if not note:

        raise HTTPException(
            status_code=404,
            detail="Note not found"
        )

    note.content = data["content"]

    db.commit()

    db.refresh(note)

    return {
        "message": "Note updated successfully"
    }

# =========================================
# DELETE NOTE
# =========================================

@router.delete("/{note_id}")
def delete_note(
    note_id: int,
    db: Session = Depends(get_db)
):

    note = db.query(Note).filter(
        Note.id == note_id
    ).first()

    if not note:
        raise HTTPException(
            status_code=404,
            detail="Note not found"
        )

    db.delete(note)

    db.commit()

    return {
        "message": "Note deleted"
    }


