from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.user import Fuel
from schemas.fuel import FuelCreate


async def create_fuel(data: FuelCreate, db: AsyncSession) -> Fuel:
    fuel = Fuel(name_fuel=data.name_fuel)
    
    try:
        db.add(fuel)
        await db.commit()
        await db.refresh(fuel)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при создании типа топлива: {str(e)}"
        )
    return fuel

async def get_fuel(fuel_id: int, db: AsyncSession) -> Optional[Fuel]:
    result = await db.execute(
        select(Fuel)
        .where(Fuel.id_fuel == fuel_id)
    )
    return result.scalar_one_or_none()

async def get_all_fuels(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[Fuel]:
    result = await db.execute(
        select(Fuel)
        .offset(skip)
        .limit(limit))
    return result.scalars().all()

async def update_fuel(fuel_id: int, data: FuelCreate, db: AsyncSession) -> Optional[Fuel]:
    fuel = await get_fuel(fuel_id, db)
    if not fuel:
        return None
    
    fuel.name_fuel = data.name_fuel
    
    try:
        await db.commit()
        await db.refresh(fuel)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при обновлении типа топлива: {str(e)}"
        )
    return fuel

async def delete_fuel(fuel_id: int, db: AsyncSession) -> bool:
    fuel = await get_fuel(fuel_id, db)
    if not fuel:
        return False
    
    try:
        await db.delete(fuel)
        await db.commit()
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при удалении типа топлива: {str(e)}"
        )
    return True