from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserCreate(BaseModel):
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
    f_name: Optional[str] = Field(None, max_length=50, description="Фамилия пользователя")
    name: Optional[str] = Field(None, max_length=50, description="Имя пользователя")
    l_name: Optional[str] = Field(None, max_length=50, description="Отчество пользователя")
    telephone: Optional[int] = Field(None, description="Номер телефона")
    n_passport: Optional[int] = Field(None, description="Серия паспорта")
    s_passport: Optional[int] = Field(None, description="Номер паспорта")
    n_vu: Optional[int] = Field(None, description="Номер водительского удостоверения")
    email: Optional[EmailStr] = Field(None, description="Email пользователя")
    password: Optional[str] = Field(None, max_length=255, description="Пароль")
    role: Optional[str] = Field(None, max_length=50, description="Роль пользователя")

    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    id_user: int = Field(..., description="ID пользователя")
    f_name: str = Field(..., description="Фамилия пользователя")
    name: str = Field(..., description="Имя пользователя")
    l_name: str = Field(..., description="Отчество пользователя")
    telephone: int = Field(..., description="Номер телефона")
    n_passport: int = Field(..., description="Серия паспорта")
    s_passport: int = Field(..., description="Номер паспорта")
    n_vu: int = Field(..., description="Номер водительского удостоверения")
    email: EmailStr = Field(..., description="Email пользователя")
    role: str = Field(..., description="Роль пользователя")

    class Config:
        from_attributes = True