from typing import List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from crud import model as ModelService
from db.session import get_session
from schemas.model import ModelCreate, ModelResponse

router = APIRouter()

@router.post("/models", response_model=ModelResponse, summary="Создание модели", tags=["Модели"])
async def create_model(
    data: ModelCreate, 
    db: AsyncSession = Depends(get_session)
):
    return await ModelService.create_model(data, db)

@router.get("/models", response_model=List[ModelResponse], summary="Получение всех моделей", tags=["Модели"])
async def get_all_models(
    skip: int = Query(0, description="Пропуск записей"),
    limit: int = Query(100, description="Лимит записей"),
    db: AsyncSession = Depends(get_session)
):
    models = await ModelService.get_all_models(db, skip=skip, limit=limit)
    return models

@router.get("/brands/{brand_id}/models", response_model=List[ModelResponse], summary="Получение моделей по бренду", tags=["Модели"])
async def get_models_by_brand(
    brand_id: int,
    db: AsyncSession = Depends(get_session)
):
    return await ModelService.get_models_by_brand(brand_id, db)
