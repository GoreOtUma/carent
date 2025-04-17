from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from models.user import Carcase
from schemas.carcase import CarcaseCreate

async def create_carcase(data: CarcaseCreate, db: AsyncSession) -> Carcase:
    carcase = carcase(name_carcase=data.name_carcase)
    
    try:
        db.add(carcase)
        await db.commit()
        await db.refresh(carcase)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при создании типа кузова: {str(e)}"
        )
    return carcase

async def get_carcase(carcase_id: int, db: AsyncSession) -> Optional[Carcase]:
    result = await db.execute(
        select(Carcase)
        .where(Carcase.id_carcase == carcase_id)
    )
    return result.scalar_one_or_none()

async def get_all_carcases(db: AsyncSession) -> List[Carcase]:
    result = await db.execute(select(Carcase))
    return result.scalars().all()