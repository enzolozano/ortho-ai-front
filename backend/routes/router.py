from fastapi import APIRouter

from . import auth

base_router = APIRouter()

base_router.include_router(auth.router, tags=["auth"], prefix="/v1")