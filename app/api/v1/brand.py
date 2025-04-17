from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from crud import brand as BrandService
from db.session import get_session
from schemas.brand import BrandCreate, BrandResponse

router = APIRouter()

@router.post("/brands", response_model=BrandResponse, summary="Создание бренда", tags=["Бренды"])
async def create_brand(
    data: BrandCreate, 
    db: AsyncSession = Depends(get_session)
):
    return await BrandService.create_brand(data, db)

@router.get("/brands", response_model=List[BrandResponse], summary="Получение всех брендов", tags=["Бренды"])
async def get_all_brands(
    skip: int = Query(0, description="Пропуск записей"),
    limit: int = Query(100, description="Лимит записей"),
    db: AsyncSession = Depends(get_session)
):
    return await BrandService.get_all_brands(db)[skip:skip+limit]

@router.get("/brands/{brand_id}", response_model=BrandResponse, summary="Получение бренда по ID", tags=["Бренды"])
async def get_brand(
    brand_id: int, 
    db: AsyncSession = Depends(get_session)
):
    brand = await BrandService.get_brand(brand_id, db)
    if not brand:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Бренд не найден")
    return brand