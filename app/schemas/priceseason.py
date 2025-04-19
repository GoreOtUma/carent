from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional

class PriceSeasonBase(BaseModel):
    day_from: datetime = Field(..., description="Дата начала действия сезонного тарифа")
    day_to: datetime = Field(..., description="Дата окончания действия сезонного тарифа")
    coeff: float = Field(
        ..., 
        gt=0,
        le=9.99,
        description="Коэффициент цены (например, 1.5 увеличивает базовую цену на 50%)"
    )

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "day_from": "2023-06-01T00:00:00",
                "day_to": "2023-08-31T23:59:59",
                "coeff": 1.3
            }
        }

class PriceSeasonCreate(PriceSeasonBase):
    pass

class PriceSeasonUpdate(BaseModel):
    day_from: Optional[datetime] = Field(None, description="Дата начала действия сезонного тарифа")
    day_to: Optional[datetime] = Field(None, description="Дата окончания действия сезонного тарифа")
    coeff: Optional[float] = Field(
        None, 
        gt=0,
        le=9.99,
        description="Коэффициент цены (например, 1.5 увеличивает базовую цену на 50%)"
    )

    class Config:
        from_attributes = True

class PriceSeasonResponse(PriceSeasonBase):
    id_ps: int = Field(..., description="Уникальный идентификатор сезонного тарифа")

    class Config:
        from_attributes = True