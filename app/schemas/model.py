from typing import Optional
from pydantic import BaseModel, Field
from schemas.brand import BrandResponse

class ModelCreate(BaseModel):
    name_model: str = Field(..., max_length=50)
    id_brand: int
    
    class Config:
        from_attributes = True

class ModelUpdate(BaseModel):
    name_model: Optional[str] = Field(None, max_length=50)
    id_brand: Optional[int] = None
    
    class Config:
        from_attributes = True

class ModelResponse(BaseModel):
    id_model: int
    name_model: str
    id_brand: int
    brand: BrandResponse

    class Config:
        from_attributes = True
