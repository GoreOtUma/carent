from pydantic import BaseModel

class BrandBase(BaseModel):
    name_brand: str

class BrandCreate(BrandBase):
    pass

class Brand(BrandBase):
    id_brand: int

    class Config:
        orm_mode = True
