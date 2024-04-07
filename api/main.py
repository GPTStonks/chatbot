from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import http as http_router
from .routers import ws as ws_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(http_router.router)
app.include_router(ws_router.router)
