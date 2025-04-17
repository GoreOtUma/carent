from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserCreate(BaseModel):
    name: str = Field(..., max_length=50)
    telephone: str = Field(..., max_length=15)
    passport: str = Field(..., max_length=20)
    email: EmailStr
    password: str = Field(..., max_length=255)
    role: str = Field("user", max_length=50)
    
    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=50)
    telephone: Optional[str] = Field(None, max_length=15)
    passport: Optional[str] = Field(None, max_length=20)
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(None, max_length=255)
    role: Optional[str] = Field(None, max_length=50)
    
    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    id_user: int
    name: str
    telephone: str
    passport: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True
