import sys

sys.dont_write_bytecode = True

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Callable
from loguru import logger

from exceptions.exceptions import (
    OrthoAiApiError,
    ResourceNotFoundError
)

from routes.router import base_router as router

from core.config import API_PREFIX, DEBUG, PROJECT_NAME, VERSION

app = FastAPI(title=PROJECT_NAME, debug=DEBUG, version=VERSION)
app.include_router(router, prefix=API_PREFIX)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root(): 
    return {"status": "ok"}

@app.get("/NotFound")
def not_found_test():
    raise ResourceNotFoundError(name="Teste", message="O handler funcionou :D")

def create_exception_handler(
    status_code: int, initial_detail: str
) -> Callable[[Request, OrthoAiApiError], JSONResponse]:
    detail = {"message": initial_detail}

    async def exception_handler(_: Request, exc: OrthoAiApiError) -> JSONResponse:
        if exc.message:
            detail["message"] = exc.message

        if exc.name:
            detail["message"] = f"{detail['message']} [{exc.name}]"

        logger.error(exc)
        return JSONResponse(
            status_code=status_code, content={"detail": detail["message"]}
        )

    return exception_handler

app.add_exception_handler(
    exc_class_or_status_code=ResourceNotFoundError,
    handler=create_exception_handler(
        status.HTTP_404_NOT_FOUND, "Resource does not exist."
    )
)