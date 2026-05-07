from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse

from sqlalchemy.orm import Session

from database import SessionLocal

from models.models import Lead

import pandas as pd


router = APIRouter(
    prefix="/export",
    tags=["Export"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# =========================================
# EXPORT CSV
# =========================================

@router.get("/csv")
def export_csv(
    db: Session = Depends(get_db)
):

    leads = db.query(Lead).all()

    data = []

    for lead in leads:

        data.append({
            "ID": lead.id,
            "Name": lead.name,
            "Company": lead.company,
            "Email": lead.email,
            "Phone": lead.phone,
            "Source": lead.source,
            "Assigned Salesperson": lead.assigned_salesperson,
            "Status": lead.status,
            "Estimated Value": lead.deal_value,
            "Created At": lead.created_at,
            "Updated At": lead.updated_at
        })

    df = pd.DataFrame(data)

    file_name = "leads.csv"

    df.to_csv(file_name, index=False)

    return FileResponse(
        path=file_name,
        filename=file_name,
        media_type="text/csv"
    )


# =========================================
# EXPORT EXCEL
# =========================================

@router.get("/excel")
def export_excel(
    db: Session = Depends(get_db)
):

    leads = db.query(Lead).all()

    data = []

    for lead in leads:

        data.append({
            "ID": lead.id,
            "Name": lead.name,
            "Company": lead.company,
            "Email": lead.email,
            "Phone": lead.phone,
            "Source": lead.source,
            "Assigned Salesperson": lead.assigned_salesperson,
            "Status": lead.status,
            "Estimated Value": lead.deal_value,
            "Created At": lead.created_at,
            "Updated At": lead.updated_at
        })

    df = pd.DataFrame(data)

    file_name = "leads.xlsx"

    df.to_excel(file_name, index=False)

    return FileResponse(
        path=file_name,
        filename=file_name,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )