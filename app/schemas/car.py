from typing import Optional, List
from pydantic import BaseModel, Field
from schemas.model import ModelResponse
from schemas.transmission import TransmissionResponse
from schemas.fuel import FuelResponse
from schemas.carcase import CarcaseResponse

class CarCreate(BaseModel):
    gos_number: str = Field(..., max_length=50)
    id_model: int
    year: int
    id_trans: int
    id_fuel: int
    id_carcase: int
    trunk_volume: int
    engine_volume: float  
    seating_capacity: int
    color: str = Field(..., max_length=50)
    mileage: int
    description: Optional[str] = None
    cost_day: int
    is_rented: Optional[str]
    image_path: Optional[str] = Field(None, max_length=255)
    
    class Config:
        from_attributes = True

class CarUpdate(BaseModel):
    gos_number: Optional[str] = Field(None, max_length=50)
    id_model: Optional[int] = None
    year: Optional[int] = None
    id_trans: Optional[int] = None
    id_fuel: Optional[int] = None
    id_carcase: Optional[int] = None
    trunk_volume: Optional[int] = None
    engine_volume: Optional[float] = None
    seating_capacity: Optional[int] = None
    color: Optional[str] = Field(None, max_length=50)
    mileage: Optional[int] = None
    description: Optional[str] = None
    cost_day: Optional[int] = None
    is_rented: Optional[str]
    image_path: Optional[str] = Field(None, max_length=255)
    
    class Config:
        from_attributes = True

class CarResponse(BaseModel):
    id_car: int
    gos_number: str
    model: ModelResponse
    year: int
    transmission: TransmissionResponse
    fuel: FuelResponse
    carcase: CarcaseResponse
    trunk_volume: int
    engine_volume: float  
    seating_capacity: int
    color: str
    mileage: int
    description: Optional[str]
    cost_day: int
    is_rented: Optional[str]
    image_path: Optional[str]

    class Config:
        from_attributes = True
