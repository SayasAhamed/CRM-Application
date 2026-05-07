from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine

from routes import auth
from routes import leads
from routes import notes
from routes import export


# =========================================
# CREATE DATABASE TABLES
# =========================================

Base.metadata.create_all(bind=engine)


# =========================================
# CREATE FASTAPI APP
# =========================================

app = FastAPI()


# =========================================
# CORS
# =========================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =========================================
# ROUTES
# =========================================

app.include_router(auth.router)

app.include_router(leads.router)

app.include_router(notes.router)

app.include_router(export.router)


# =========================================
# ROOT ROUTE
# =========================================

@app.get("/")
def root():

    return {
        "message": "CRM Backend Running"
    }