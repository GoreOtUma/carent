from typing import Optional
from pydantic import BaseModel, Field
class BrandCreate(BaseModel):
    name_brand: str = Field(..., max_length=50)
    
    class Config:
        from_attributes = True

class BrandUpdate(BaseModel):
    name_brand: Optional[str] = Field(None, max_length=50)
    
    class Config:
        from_attributes = True

class BrandResponse(BaseModel):
    id_brand: int
    name_brand: str

    class Config:
        from_attributes = True