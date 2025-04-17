from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from models.user import ReturnCar
from schemas.returncar import ReturnCarCreate, ReturnCarUpdate

async def create_return_car(db: AsyncSession, return_data: ReturnCarCreate):
    return_car = ReturnCar(**return_data.model_dump())
    db.add(return_car)
    await db.commit()
    await db.refresh(return_car)
    return return_car

async def get_return_car(db: AsyncSession, return_id: int):
    result = await db.execute(
        select(ReturnCar)
        .where(ReturnCar.id_return == return_id)
    )
    return result.scalar_one_or_none()

async def update_return_car(db: AsyncSession, return_id: int, update_data: ReturnCarUpdate):
    return_car = await get_return_car(db, return_id)
    if not return_car:
        return None
    
    update_data = update_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(return_car, field, value)
    
    await db.commit()
    await db.refresh(return_car)
    return return_car
