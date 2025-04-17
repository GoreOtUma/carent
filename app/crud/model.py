from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from models.user import Model
from schemas.model import ModelCreate, ModelUpdate

async def create_model(data: ModelCreate, db: AsyncSession) -> Model:
    model = Model(
        name_model=data.name_model,
        id_brand=data.id_brand
    )
    
    try:
        db.add(model)
        await db.commit()
        await db.refresh(model)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при создании модели: {str(e)}"
        )
    return model

async def get_model(model_id: int, db: AsyncSession) -> Optional[Model]:
    result = await db.execute(
        select(Model)
        .options(selectinload(Model.brand))
        .where(Model.id_model == model_id)
    )
    return result.scalar_one_or_none()

async def get_models_by_brand(brand_id: int, db: AsyncSession) -> List[Model]:
    result = await db.execute(
        select(Model)
        .options(selectinload(Model.brand))
        .where(Model.id_brand == brand_id)
    )
    return result.scalars().all()

async def get_all_models(db: AsyncSession) -> List[Model]:
    result = await db.execute(
        select(Model)
        .options(selectinload(Model.brand))
    )
    return result.scalars().all()