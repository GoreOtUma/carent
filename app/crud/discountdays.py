from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from models.user import DiscountDays
from schemas.discountdays import DiscountDaysCreate

async def create_discount(data: DiscountDaysCreate, db: AsyncSession) -> DiscountDays:
    discount = DiscountDays(
        count_day=data.count_day,
        day_from=data.day_from,
        day_to=data.day_to,
        costf=data.costf
    )
    
    try:
        db.add(discount)
        await db.commit()
        await db.refresh(discount)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при создании скидки: {str(e)}"
        )
    return discount

async def get_discount(discount_id: int, db: AsyncSession) -> Optional[DiscountDays]:
    result = await db.execute(
        select(DiscountDays)
        .where(DiscountDays.id_discount == discount_id)
    )
    return result.scalar_one_or_none()

async def get_all_discounts(db: AsyncSession) -> List[DiscountDays]:
    result = await db.execute(select(DiscountDays))
    return result.scalars().all()

async def update_discount(discount_id: int, data: DiscountDaysCreate, db: AsyncSession) -> Optional[DiscountDays]:
    discount = await get_discount(discount_id, db)
    if not discount:
        return None
    
    discount.count_day = data.count_day
    discount.day_from = data.day_from
    discount.day_to = data.day_to
    discount.costf = data.costf
    
    try:
        await db.commit()
        await db.refresh(discount)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при обновлении скидки: {str(e)}"
        )
    return discount

async def delete_discount(discount_id: int, db: AsyncSession) -> bool:
    discount = await get_discount(discount_id, db)
    if not discount:
        return False
    
    try:
        await db.delete(discount)
        await db.commit()
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при удалении скидки: {str(e)}"
        )
    return True