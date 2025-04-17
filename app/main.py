from fastapi import FastAPI
import uvicorn;
from api.v1.user import router as userrouter
from api.v1.brand import router as brandrouter
from api.v1.model import router as modelrouter
from api.v1.car import router as carrouter
from api.v1.carcase import router as carcaserouter
from api.v1.contract import router as contractrouter
from api.v1.discountdays import router as discountdaysrouter
from api.v1.fuel import router as fuelrouter
from api.v1.insurance import router as insurancerouter
from api.v1.priceseason import router as priceseasonrouter
from api.v1.returncar import router as returncarrouter
from api.v1.transmission import router as transmissionrouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(brandrouter, prefix="/api/v1")
app.include_router(modelrouter, prefix="/api/v1")
app.include_router(carrouter, prefix="/api/v1")
app.include_router(carcaserouter, prefix="/api/v1")
app.include_router(contractrouter, prefix="/api/v1")
app.include_router(discountdaysrouter, prefix="/api/v1")
app.include_router(fuelrouter, prefix="/api/v1")
app.include_router(insurancerouter, prefix="/api/v1")
app.include_router(priceseasonrouter, prefix="/api/v1")
app.include_router(returncarrouter, prefix="/api/v1")
app.include_router(transmissionrouter, prefix="/api/v1")
app.include_router(userrouter, prefix="/api/v1")

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