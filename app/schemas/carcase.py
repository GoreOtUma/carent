from typing import Optional
from pydantic import BaseModel, Field

class CarcaseCreate(BaseModel):
    name_carcase: str = Field(..., max_length=50)
    
    class Config:
        from_attributes = True

class CarcaseResponse(BaseModel):
    id_carcase: int
    name_carcase: str

    class Config:
        from_attributes = True
