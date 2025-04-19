from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.user import Brand
from schemas.brand import BrandCreate, BrandUpdate

async def create_brand(data: BrandCreate, db: AsyncSession) -> Brand:
    brand = Brand(name_brand=data.name_brand)
    
    try:
        db.add(brand)
        await db.commit()
        await db.refresh(brand)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при создании бренда: {str(e)}"
        )
    return brand

async def get_brand(brand_id: int, db: AsyncSession) -> Optional[Brand]:
    result = await db.execute(
        select(Brand)
        .where(Brand.id_brand == brand_id)
    )
    return result.scalar_one_or_none()

async def get_all_brands(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[Brand]:
    result = await db.execute(
        select(Brand)
        .offset(skip)
        .limit(limit)
        .order_by(Brand.id_brand)
    )
    return result.scalars().all()

async def update_brand(brand_id: int, data: BrandUpdate, db: AsyncSession) -> Optional[Brand]:
    brand = await get_brand(brand_id, db)
    if not brand:
        return None
    
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(brand, field, value)
    
    try:
        await db.commit()
        await db.refresh(brand)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при обновлении бренда: {str(e)}"
        )
    return brand

async def delete_brand(brand_id: int, db: AsyncSession) -> bool:
    brand = await get_brand(brand_id, db)
    if not brand:
        return False
    
    try:
        await db.delete(brand)
        await db.commit()
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при удалении бренда: {str(e)}"
        )
    return True

