from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models.models import User
from schemas.schemas import UserLogin
from passlib.context import CryptContext

router = APIRouter(prefix="/auth", tags=["Authentication"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/create-admin")
def create_admin(db: Session = Depends(get_db)):

    existing = db.query(User).filter(
        User.email == "admin@example.com"
    ).first()

    if existing:
        return {"message": "Admin already exists"}

    hashed_password = pwd_context.hash("password123")

    admin = User(
        email="admin@example.com",
        password=hashed_password
    )

    db.add(admin)
    db.commit()

    return {"message": "Admin created"}


@router.post("/login")
def login(data: UserLogin, db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        return {"success": False}

    verified = pwd_context.verify(
        data.password,
        user.password
    )

    if not verified:
        return {"success": False}

    return {
        "success": True,
        "user": {
            "email": user.email
        }
    }