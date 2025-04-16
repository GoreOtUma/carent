from typing import List
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.user import Brand
from schemas.brand import BrandCreate

async def create_brand(data: BrandCreate, db: AsyncSession) -> Brand:
    brand = Brand(name_brand=data.name_brand)
    
    try:
        db.add(brand)
        await db.commit()
        await db.refresh(brand)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=f"Ошибка при добавлении бренда: {str(e)}")

    return brand

async def get_all_brands(db: AsyncSession) -> List[Brand]:
    try:
        result = await db.execute(select(Brand))
        brands = result.scalars().all()
        return brands
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Ошибка при получении брендов: {str(e)}")

