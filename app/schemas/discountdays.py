from typing import Optional
from pydantic import BaseModel, Field

class DiscountDaysCreate(BaseModel):
    count_day: int
    day_from: str = Field(..., max_length=5)
    day_to: str = Field(..., max_length=5)
    costf: float
    
    class Config:
        from_attributes = True

class DiscountDaysResponse(BaseModel):
    id_discount: int
    count_day: int
    day_from: str
    day_to: str
    costf: float

    class Config:
        from_attributes = True