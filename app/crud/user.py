from typing import List, Optional
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException, status
from sqlalchemy.orm import selectinload
from models.user import User
from schemas.user import UserCreate, UserUpdate

async def create_user(data: UserCreate, db: AsyncSession) -> User:
    user = User(
        name=data.name,
        telephone=data.telephone,
        passport=data.passport,
        email=data.email,
        password=data.password, 
        role=data.role
    )
    
    try:
        db.add(user)
        await db.commit()
        await db.refresh(user)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при создании пользователя: {str(e)}"
        )
    return user

async def get_user_by_email(email: str, db: AsyncSession) -> Optional[User]:
    result = await db.execute(
        select(User)
        .where(User.email == email)
    )
    return result.scalar_one_or_none()

async def get_user(user_id: int, db: AsyncSession) -> Optional[User]:
    result = await db.execute(
        select(User)
        .where(User.id_user == user_id)
    )
    return result.scalar_one_or_none()

async def get_all_users(db: AsyncSession) -> List[User]:
    result = await db.execute(select(User))
    return result.scalars().all()

async def update_user(user_id: int, data: UserUpdate, db: AsyncSession) -> Optional[User]:
    user = await get_user(user_id, db)
    if not user:
        return None
    
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)
    
    try:
        await db.commit()
        await db.refresh(user)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при обновлении пользователя: {str(e)}"
        )
    return user

async def delete_user(user_id: int, db: AsyncSession) -> bool:
    user = await get_user(user_id, db)
    if not user:
        return False
    
    try:
        await db.delete(user)
        await db.commit()
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при удалении пользователя: {str(e)}"
        )
    return True