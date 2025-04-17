from typing import Optional
from pydantic import BaseModel, Field

class InsuranceCreate(BaseModel):
    type_in: str = Field(..., max_length=50)
    cost: float
    
    class Config:
        from_attributes = True

class InsuranceResponse(BaseModel):
    id_insurance: int
    type_in: str
    cost: float

    class Config:
        from_attributes = True