from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserBase(BaseModel):
    f_name: str
    name: str
    l_name: str
    telephone: int
    n_passport: int
    n_vu: int
    s_passport: int
    email: EmailStr
    role: str

class UserCreate(UserBase):
    f_name: str = Field(..., max_length=50, description="Фамилия пользователя")
    name: str = Field(..., max_length=50, description="Имя пользователя")
    l_name: str = Field(..., max_length=50, description="Отчество пользователя")
    telephone: int = Field(..., description="Номер телефона")
    n_passport: int = Field(..., description="Серия паспорта")
    s_passport: int = Field(..., description="Номер паспорта")
    n_vu: int = Field(..., description="Номер водительского удостоверения")
    email: EmailStr = Field(..., description="Email пользователя")
    password: str = Field(..., max_length=255, description="Пароль")
    role: str = Field("user", max_length=50, description="Роль пользователя")

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    f_name: Optional[str]
    name: Optional[str]
    l_name: Optional[str]
    telephone: Optional[int]
    n_passport: Optional[int]
    n_vu: Optional[int]
    s_passport: Optional[int]
    email: Optional[EmailStr]
    password: Optional[str]
    role: Optional[str]

class UserResponse(UserBase):
    id_user: int

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str
