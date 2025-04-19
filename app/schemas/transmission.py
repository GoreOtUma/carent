from pydantic import BaseModel, Field

class TransmissionCreate(BaseModel):
    name_trans: str = Field(..., max_length=50)
    
    class Config:
        from_attributes = True

class TransmissionResponse(BaseModel):
    id_trans: int
    name_trans: str

    class Config:
        from_attributes = True