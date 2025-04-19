from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.user import Insurance
from schemas.insurance import InsuranceCreate

async def create_insurance(data: InsuranceCreate, db: AsyncSession) -> Insurance:
    insurance = Insurance(
        type_ins=data.type_ins,
        cost=data.cost
    )
    
    try:
        db.add(insurance)
        await db.commit()
        await db.refresh(insurance)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при создании страховки: {str(e)}"
        )
    return insurance

async def get_insurance(ins_id: int, db: AsyncSession) -> Optional[Insurance]:
    result = await db.execute(
        select(Insurance)
        .where(Insurance.id_ins == ins_id)
    )
    return result.scalar_one_or_none()

async def get_all_insurances(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[Insurance]:
    result = await db.execute(
        select(Insurance)
        .offset(skip)
        .limit(limit))
    return result.scalars().all()