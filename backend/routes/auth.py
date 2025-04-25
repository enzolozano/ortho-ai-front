from fastapi import APIRouter
from models.auth_model import LoginRequest
from services.auth_service import process_login

router = APIRouter()

@router.post("/login")
async def login(login_request: LoginRequest):
    return process_login(login_request)

@router.post("/register")
async def register(login_request: LoginRequest):
    return { "status": "ok" }
