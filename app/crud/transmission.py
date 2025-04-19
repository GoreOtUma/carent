from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.user import Transmission
from schemas.transmission import TransmissionCreate

async def create_transmission(data: TransmissionCreate, db: AsyncSession) -> Transmission:
    transmission = Transmission(name_trans=data.name_trans)
    
    try:
        db.add(transmission)
        await db.commit()
        await db.refresh(transmission)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при создании типа трансмиссии: {str(e)}"
        )
    return transmission

async def get_transmission(trans_id: int, db: AsyncSession) -> Optional[Transmission]:
    result = await db.execute(
        select(Transmission)
        .where(Transmission.id_trans == trans_id)
    )
    return result.scalar_one_or_none()

async def get_all_transmissions(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[Transmission]:
    result = await db.execute(
        select(Transmission)
        .offset(skip)
        .limit(limit))
    return result.scalars().all()