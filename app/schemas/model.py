from pydantic import BaseModel
from schemas.brand import Brand

class ModelBase(BaseModel):
    name_model: str
    id_brand: int

class ModelCreate(ModelBase):
    pass

class Model(ModelBase):
    id_model: int
    brand: Brand

    class Config:
        orm_mode = True
