from typing import List, Optional
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException, status
from models.user import User
from schemas.user import UserCreate, UserUpdate
from core.security import get_hashed_password

async def create_user(data: UserCreate, db: AsyncSession) -> User:
    hashed_password = get_hashed_password(data.password)
    user = User(
        f_name=data.f_name,
        name=data.name,
        l_name=data.l_name,
        telephone=data.telephone,
        n_passport=data.n_passport,
        n_vu=data.n_vu,
        s_passport=data.s_passport,
        email=data.email,
        password=hashed_password, 
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

async def get_user_by_id(user_id: int, db: AsyncSession) -> Optional[User]:
    result = await db.execute(
        select(User)
        .where(User.id_user == user_id)
    )
    return result.scalar_one_or_none()

async def get_all_users(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[User]:
    result = await db.execute(
        select(User)
        .offset(skip)
        .limit(limit))
    return result.scalars().all()

async def update_user(user_id: int, data: UserUpdate, db: AsyncSession) -> User:
    try:
        async with db.begin():
            result = await db.execute(select(User).filter(User.id_user == user_id))
            user = result.scalar_one_or_none()
            if not user:
                raise Exception("Пользователь не найден")
            if data.f_name:
                user.f_name = data.f_name
            if data.name:
                user.name = data.name
            if data.l_name:
                user.l_name = data.l_name
            if data.telephone:
                user.telephone = data.telephone
            if data.n_passport:
                user.n_passport = data.n_passport
            if data.n_vu:
                user.n_vu = data.n_vu
            if data.s_passport:
                user.s_passport = data.s_passport
            if data.password:
                user.password = data.password
            if data.email:
                user.email = data.email
            return user
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Ошибка при обновлении пользователя: {str(e)}")


async def delete_user(user_id: int, db: AsyncSession) -> bool:
    try:
        async with db.begin():
            result = await db.execute(select(User).filter(User.id_user == user_id))
            user = result.scalar_one_or_none()
            if not user:
                raise Exception("Пользователь не найден")
            await db.delete(user)
        return True
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Ошибка при удалении пользователя: {str(e)}")
