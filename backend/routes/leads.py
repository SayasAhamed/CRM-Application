from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from database import SessionLocal
from models.models import Lead

from schemas.schemas import LeadCreate, LeadResponse

router = APIRouter(
    prefix="/leads",
    tags=["Leads"]
)


# =========================================
# DATABASE CONNECTION
# =========================================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# =========================================
# DASHBOARD ANALYTICS
# =========================================

@router.get("/dashboard/stats")
def dashboard_stats(
    db: Session = Depends(get_db)
):

    leads = db.query(Lead).all()

    total_leads = len(leads)

    new_leads = len([
        lead for lead in leads
        if lead.status == "New"
    ])

    qualified_leads = len([
        lead for lead in leads
        if lead.status == "Qualified"
    ])

    won_leads = len([
        lead for lead in leads
        if lead.status == "Won"
    ])

    lost_leads = len([
        lead for lead in leads
        if lead.status == "Lost"
    ])

    total_value = sum([
        lead.estimated_value or 0
        for lead in leads
    ])

    won_value = sum([
        lead.estimated_value or 0
        for lead in leads
        if lead.status == "Won"
    ])

    return {

        "total_leads": total_leads,

        "new_leads": new_leads,

        "qualified_leads": qualified_leads,

        "won_leads": won_leads,

        "lost_leads": lost_leads,

        "total_value": total_value,

        "won_value": won_value
    }


# =========================================
# GET ALL LEADS
# =========================================

@router.get("/", response_model=list[LeadResponse])
def get_leads(
    db: Session = Depends(get_db)
):

    leads = db.query(Lead).all()

    return leads


# =========================================
# CREATE LEAD
# =========================================

@router.post("/", response_model=LeadResponse)
def create_lead(
    data: LeadCreate,
    db: Session = Depends(get_db)
):

    new_lead = Lead(

        name=data.name,

        company=data.company,

        email=data.email,

        phone=data.phone,

        source=data.source,

        assigned_salesperson=data.assigned_salesperson,

        status=data.status,

        estimated_value=data.estimated_value,

        created_at=datetime.utcnow(),

        updated_at=datetime.utcnow()
    )

    db.add(new_lead)

    db.commit()

    db.refresh(new_lead)

    return new_lead


# =========================================
# UPDATE LEAD
# =========================================

@router.put("/{lead_id}")
def update_lead(

    lead_id: int,

    data: LeadCreate,

    db: Session = Depends(get_db)
):

    lead = db.query(Lead).filter(
        Lead.id == lead_id
    ).first()

    if not lead:

        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    lead.name = data.name

    lead.company = data.company

    lead.email = data.email

    lead.phone = data.phone

    lead.source = data.source

    lead.assigned_salesperson = data.assigned_salesperson

    lead.status = data.status

    lead.estimated_value = data.estimated_value

    lead.updated_at = datetime.utcnow()

    db.commit()

    db.refresh(lead)

    return {

        "message": "Lead updated successfully"
    }


# =========================================
# DELETE LEAD
# =========================================

@router.delete("/{lead_id}")
def delete_lead(

    lead_id: int,

    db: Session = Depends(get_db)
):

    lead = db.query(Lead).filter(
        Lead.id == lead_id
    ).first()

    if not lead:

        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    db.delete(lead)

    db.commit()

    return {

        "message": "Lead deleted successfully"
    }