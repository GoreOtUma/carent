from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from crud import model as ModelService
from db.session import get_session
from schemas.model import ModelCreate, Model

router = APIRouter()

@router.post("/models", response_model=Model, summary="Создание модели", tags=["Модели"])
async def create_model_handler(data: ModelCreate, db: AsyncSession = Depends(get_session)):
    return await ModelService.create_model(data, db)

@router.get("/models", response_model=List[Model], summary="Получение всех моделей", tags=["Модели"])
async def get_all_models_handler(db: AsyncSession = Depends(get_session)):
    return await ModelService.get_all_models(db)
