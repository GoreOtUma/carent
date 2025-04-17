from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime
from schemas.user import UserResponse
from schemas.car import CarResponse
from schemas.insurance import InsuranceResponse
from schemas.returncar import ReturnCarResponse

class ContractCreate(BaseModel):
    id_user: int
    id_car: int
    start_date: datetime
    end_date: datetime
    total_cost: float
    id_insurance: int
    status: str = Field("active", max_length=50)
    
    class Config:
        from_attributes = True

class ContractUpdate(BaseModel):
    id_user: Optional[int] = None
    id_car: Optional[int] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    total_cost: Optional[float] = None
    id_insurance: Optional[int] = None
    status: Optional[str] = Field(None, max_length=50)
    
    class Config:
        from_attributes = True

class ContractResponse(BaseModel):
    id_contract: int
    user: UserResponse
    car: CarResponse
    start_date: datetime
    end_date: datetime
    total_cost: float
    insurance: InsuranceResponse
    status: str
    return_info: Optional[ReturnCarResponse] = None

    class Config:
        from_attributes = True
