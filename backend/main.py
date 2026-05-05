from fastapi import FastAPI
from database import engine, Base

from routes import auth, leads, notes

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(leads.router)
app.include_router(notes.router)