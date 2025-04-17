from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from crud import discountdays as DiscountService
from db.session import get_session
from schemas.discountdays import DiscountDaysCreate, DiscountDaysResponse

router = APIRouter()

@router.post("/discounts", response_model=DiscountDaysResponse, summary="Создание скидки", tags=["Скидки"])
async def create_discount(
    data: DiscountDaysCreate,
    db: AsyncSession = Depends(get_session)
):
    return await DiscountService.create_discount(data, db)

@router.get("/discounts", response_model=List[DiscountDaysResponse], summary="Получение всех скидок", tags=["Скидки"])
async def get_all_discounts(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_session)
):
    return await DiscountService.get_all_discounts(db)[skip:skip+limit]

@router.put("/discounts/{discount_id}", response_model=DiscountDaysResponse, summary="Обновление скидки", tags=["Скидки"])
async def update_discount(
    discount_id: int,
    data: DiscountDaysCreate,
    db: AsyncSession = Depends(get_session)
):
    discount = await DiscountService.update_discount(discount_id, data, db)
    if not discount:
        raise HTTPException(status_code=404, detail="Скидка не найдена")
    return discount