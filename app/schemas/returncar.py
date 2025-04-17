from datetime import datetime
from pydantic import BaseModel, Field

class ReturnCarBase(BaseModel):
    id_contract: int
    condition: str = Field(None, max_length=100)
    fuel_level: float = Field(None, ge=0, le=100)
    mileage_after: int = Field(None, ge=0)
    notes: str | None = None
    fine_amount: float = Field(0, ge=0)

class ReturnCarCreate(ReturnCarBase):
    pass

class ReturnCarUpdate(BaseModel):
    condition: str | None = Field(None, max_length=100)
    fuel_level: float | None = Field(None, ge=0, le=100)
    mileage_after: int | None = Field(None, ge=0)
    notes: str | None = None
    fine_amount: float | None = Field(None, ge=0)

class ReturnCarResponse(ReturnCarBase):
    id_return: int
    return_date: datetime
    
    class Config:
        from_attributes = True