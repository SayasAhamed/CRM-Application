from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from database import Base


# =========================================
# USER
# =========================================

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True)

    password = Column(String)


# =========================================
# LEADS
# =========================================

class Lead(Base):

    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    company = Column(String)

    email = Column(String)

    phone = Column(String)

    source = Column(String)

    assigned_salesperson = Column(String)

    status = Column(String)

    # IMPORTANT FIX
    estimated_value = Column(Float)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    notes = relationship(
        "Note",
        back_populates="lead",
        cascade="all, delete"
    )


# =========================================
# NOTES
# =========================================

class Note(Base):

    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)

    content = Column(String)

    created_by = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    lead_id = Column(
        Integer,
        ForeignKey("leads.id")
    )

    lead = relationship(
        "Lead",
        back_populates="notes"
    )