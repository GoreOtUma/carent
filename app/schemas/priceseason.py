from datetime import datetime
from pydantic import BaseModel, Field

class PriceSeasonBase(BaseModel):
    id_car: int
    season_name: str = Field(..., max_length=50)
    start_date: datetime
    end_date: datetime
    price_multiplier: float = Field(..., gt=0)

class PriceSeasonCreate(PriceSeasonBase):
    pass

class PriceSeasonUpdate(BaseModel):
    season_name: str | None = Field(None, max_length=50)
    start_date: datetime | None = None
    end_date: datetime | None = None
    price_multiplier: float | None = Field(None, gt=0)

class PriceSeasonResponse(PriceSeasonBase):
    id_season: int
    
    class Config:
        from_attributes = True