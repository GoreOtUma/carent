from typing import Optional
from pydantic import BaseModel, Field

class InsuranceCreate(BaseModel):
    type_ins: str = Field(..., max_length=50)
    cost: float
    
    class Config:
        from_attributes = True

class InsuranceResponse(BaseModel):
    id_ins: int
    type_ins: str
    cost: float

    class Config:
        from_attributes = True