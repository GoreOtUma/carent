from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from crud import brand as BrandService
from db.session import get_session
from schemas.brand import BrandCreate, Brand

router = APIRouter()

@router.post("/brands", response_model=Brand, summary="Создание бренда", tags=["Бренды"])
async def create_brand_handler(data: BrandCreate, db: AsyncSession = Depends(get_session)):
    return await BrandService.create_brand(data, db)

@router.get("/brands", response_model=List[Brand], summary="Получение всех брендов", tags=["Бренды"])
async def get_all_brands_handler(db: AsyncSession = Depends(get_session)):
    return await BrandService.get_all_brands(db)
