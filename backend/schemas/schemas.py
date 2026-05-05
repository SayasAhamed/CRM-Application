from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LeadBase(BaseModel):
    name: str
    company: str
    email: str
    phone: str
    source: str
    salesperson: str
    status: str
    deal_value: float

class LeadCreate(LeadBase):
    pass

class LeadResponse(LeadBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


class NoteCreate(BaseModel):
    content: str
    created_by: str
    lead_id: int


class NoteResponse(NoteCreate):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True