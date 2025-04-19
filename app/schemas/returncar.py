from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class ReturnCarBase(BaseModel):
    id_car: int = Field(..., description="ID автомобиля")
    id_user: int = Field(..., description="ID пользователя")
    id_contr: int = Field(..., description="ID контракта")
    date_return: Optional[datetime] = Field(None, description="Дата возврата")

class ReturnCarCreate(ReturnCarBase):
    pass

class ReturnCarUpdate(ReturnCarBase):
    pass

class ReturnCarResponse(ReturnCarBase):
    id_ret: int = Field(..., description="ID записи о возврате")
    
    class Config:
        from_attributes = True