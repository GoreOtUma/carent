from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.user import Insurance
from schemas.insurance import InsuranceCreate

async def create_insurance(data: InsuranceCreate, db: AsyncSession) -> Insurance:
    insurance = Insurance(
        type_in=data.type_in,
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

async def get_insurance(insurance_id: int, db: AsyncSession) -> Optional[Insurance]:
    result = await db.execute(
        select(Insurance)
        .where(Insurance.id_insurance == insurance_id)
    )
    return result.scalar_one_or_none()

async def get_all_insurances(db: AsyncSession) -> List[Insurance]:
    result = await db.execute(select(Insurance))
    return result.scalars().all()