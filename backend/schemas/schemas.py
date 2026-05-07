from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# =========================================
# LOGIN
# =========================================

class UserLogin(BaseModel):

    email: str

    password: str


# =========================================
# LEAD CREATE
# =========================================

class LeadCreate(BaseModel):

    name: str

    company: str

    email: str

    phone: str

    source: str

    assigned_salesperson: str

    status: str

    estimated_value: float


# =========================================
# LEAD RESPONSE
# =========================================

class LeadResponse(BaseModel):

    id: int

    name: str

    company: str

    email: str

    phone: str

    source: str

    assigned_salesperson: str

    status: str

    estimated_value: float

    created_at: Optional[datetime] = None

    updated_at: Optional[datetime] = None

    class Config:

        from_attributes = True


# =========================================
# NOTE CREATE
# =========================================

class NoteCreate(BaseModel):

    lead_id: int

    content: str

    created_by: str


# =========================================
# NOTE RESPONSE
# =========================================

class NoteResponse(BaseModel):

    id: int

    lead_id: int

    content: str

    created_by: str

    created_at: Optional[datetime] = None

    class Config:

        from_attributes = True