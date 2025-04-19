from typing import Optional
from pydantic import BaseModel, Field

class DiscountDaysCreate(BaseModel):
    count_day: int
    coeff: float
    
    class Config:
        from_attributes = True

class DiscountDaysResponse(BaseModel):
    id_discount: int
    count_day: int
    coeff: float

    class Config:
        from_attributes = True