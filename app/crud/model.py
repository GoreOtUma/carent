from typing import List
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from models.user import Model
from schemas.model import ModelCreate

async def create_model(data: ModelCreate, db: AsyncSession) -> Model:
    model = Model(name_model=data.name_model, id_brand=data.id_brand)
    
    try:
        db.add(model)
        await db.commit()
        await db.refresh(model)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=f"Ошибка при добавлении модели: {str(e)}")

    return model

async def get_all_models(db: AsyncSession) -> List[Model]:
    try:
        result = await db.execute(select(Model).options(selectinload(Model.brand)))
        models = result.scalars().all()
        return models
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Ошибка при получении моделей: {str(e)}")
