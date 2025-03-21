from fastapi import HTTPException, status
from models.auth_model import LoginRequest

def process_login(login_request: LoginRequest):
    username = login_request.username
    password = login_request.password

    if username == "admin" and password == "admin":
        return { "status": "ok" }
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas",
            headers={"WWW-Authenticate": "Bearer"},  # Agora é um dicionário
        )