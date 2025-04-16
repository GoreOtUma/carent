from fastapi import FastAPI
import uvicorn
from api.v1.brand import router as brandrouter
from api.v1.model import router as modelrouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(brandrouter, prefix="/api/v1")
app.include_router(modelrouter, prefix="/api/v1")

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)