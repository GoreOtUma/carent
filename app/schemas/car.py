from typing import Optional, List
from pydantic import BaseModel, Field
from schemas.model import ModelResponse
from schemas.transmission import TransmissionResponse
from schemas.fuel import FuelResponse
from schemas.carcase import CarcaseResponse
from schemas.priceseason import PriceSeasonResponse

class CarCreate(BaseModel):
    png_number: str = Field(..., max_length=50)
    id_model: int
    year: str = Field(..., max_length=4)
    id_trans: int
    id_fuel: int
    id_carcase: int
    trunk_volume: str = Field(..., max_length=5)
    engine_volume: str = Field(..., max_length=4)
    seating_capacity: str = Field(..., max_length=2)
    color: str = Field(..., max_length=50)
    mileage: int
    description: Optional[str] = None
    cost_day: int
    is_active: bool = True
    image_path: Optional[str] = Field(None, max_length=255)
    
    class Config:
        from_attributes = True

class CarUpdate(BaseModel):
    png_number: Optional[str] = Field(None, max_length=50)
    id_model: Optional[int] = None
    year: Optional[str] = Field(None, max_length=4)
    id_trans: Optional[int] = None
    id_fuel: Optional[int] = None
    id_carcase: Optional[int] = None
    trunk_volume: Optional[str] = Field(None, max_length=5)
    engine_volume: Optional[str] = Field(None, max_length=4)
    seating_capacity: Optional[str] = Field(None, max_length=2)
    color: Optional[str] = Field(None, max_length=50)
    mileage: Optional[int] = None
    description: Optional[str] = None
    cost_day: Optional[int] = None
    is_active: Optional[bool] = None
    image_path: Optional[str] = Field(None, max_length=255)
    
    class Config:
        from_attributes = True

class CarResponse(BaseModel):
    id_car: int
    png_number: str
    model: ModelResponse
    year: str
    transmission: TransmissionResponse
    fuel: FuelResponse
    carcase: CarcaseResponse
    trunk_volume: str
    engine_volume: str
    seating_capacity: str
    color: str
    mileage: int
    description: Optional[str]
    cost_day: int
    is_active: bool
    image_path: Optional[str]
    price_seasons: List[PriceSeasonResponse] = []

    class Config:
        from_attributes = True
