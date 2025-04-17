from pydantic import BaseModel, Field

class FuelCreate(BaseModel):
    name_fuel: str = Field(..., max_length=50)
    
    class Config:
        from_attributes = True

class FuelResponse(BaseModel):
    id_fuel: int
    name_fuel: str

    class Config:
        from_attributes = True