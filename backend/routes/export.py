from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from database import SessionLocal
from models.models import Lead

import csv
import io

router = APIRouter(
    prefix="/export",
    tags=["Export"]
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
# EXPORT CSV
# =========================================

@router.get("/csv")
def export_csv(
    db: Session = Depends(get_db)
):

    leads = db.query(Lead).all()

    output = io.StringIO()

    writer = csv.writer(output)

    # HEADER
    writer.writerow([
        "ID",
        "Name",
        "Company",
        "Email",
        "Phone",
        "Source",
        "Assigned Salesperson",
        "Status",
        "Estimated Value",
        "Created At",
        "Updated At",
    ])

    # DATA
    for lead in leads:

        writer.writerow([
            lead.id,
            lead.name,
            lead.company,
            lead.email,
            lead.phone,
            lead.source,
            lead.assigned_salesperson,
            lead.status,
            lead.estimated_value,
            lead.created_at,
            lead.updated_at,
        ])

    output.seek(0)

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition":
            "attachment; filename=leads.csv"
        }
    )


# =========================================
# EXPORT EXCEL
# =========================================

from fastapi.responses import StreamingResponse
from openpyxl import Workbook
import io


@router.get("/excel")
def export_excel(
    db: Session = Depends(get_db)
):

    leads = db.query(Lead).all()

    workbook = Workbook()

    sheet = workbook.active

    sheet.title = "Leads"


    # =========================================
    # HEADER
    # =========================================

    headers = [
        "ID",
        "Name",
        "Company",
        "Email",
        "Phone",
        "Source",
        "Assigned Salesperson",
        "Status",
        "Estimated Value",
        "Created At",
        "Updated At",
    ]

    sheet.append(headers)


    # =========================================
    # DATA
    # =========================================

    for lead in leads:

        sheet.append([
            lead.id,
            lead.name,
            lead.company,
            lead.email,
            lead.phone,
            lead.source,
            lead.assigned_salesperson,
            lead.status,
            lead.estimated_value,
            str(lead.created_at),
            str(lead.updated_at),
        ])


    # =========================================
    # SAVE TO MEMORY
    # =========================================

    stream = io.BytesIO()

    workbook.save(stream)

    stream.seek(0)


    # =========================================
    # DOWNLOAD RESPONSE
    # =========================================

    return StreamingResponse(
        stream,
        media_type=
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={
            "Content-Disposition":
            "attachment; filename=leads.xlsx"
        }
    )