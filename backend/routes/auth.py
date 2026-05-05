from fastapi import APIRouter, HTTPException

router = APIRouter()

TEST_USER = {
    "email": "admin@example.com",
    "password": "password123"
}

@router.post("/login")
def login(user: dict):
    if user["email"] == TEST_USER["email"] and user["password"] == TEST_USER["password"]:
        return {"message": "Login successful"}
    raise HTTPException(status_code=401, detail="Invalid credentials")