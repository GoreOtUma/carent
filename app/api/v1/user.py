from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from crud import user as UserService
from db.session import get_session
from schemas.user import UserCreate, UserUpdate, UserResponse

router = APIRouter()
@router.post("/users", response_model=UserResponse, summary="Создание пользователя", tags=["Пользователи"])
async def create_user(
    data: UserCreate, 
    db: AsyncSession = Depends(get_session)
):
    return await UserService.create_user(data, db)

@router.get("/users/{user_id}", response_model=UserResponse, summary="Получение пользователя по ID", tags=["Пользователи"])
async def get_user(
    user_id: int, 
    db: AsyncSession = Depends(get_session)
):
    user = await UserService.get_user(user_id, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Пользователь не найден")
    return user

@router.get("/users", response_model=List[UserResponse], summary="Получение всех пользователей", tags=["Пользователи"])
async def get_all_users(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_session)
):
    return await UserService.get_all_users(db, skip=skip, limit=limit)

@router.put("/users/{user_id}", response_model=UserResponse, summary="Обновление пользователя", tags=["Пользователи"])
async def update_user(
    user_id: int,
    data: UserUpdate,
    db: AsyncSession = Depends(get_session)
):
    user = await UserService.update_user(user_id, data, db)
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return user

@router.get("/users/by-email/{email}", response_model=UserResponse, summary="Получение пользователя по email", tags=["Пользователи"])
async def get_user_by_email(
    email: str,
    db: AsyncSession = Depends(get_session)
):
    user = await UserService.get_user_by_email(email, db)
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return user