from typing import List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from crud import carcase as CarcaseService
from db.session import get_session
from schemas.carcase import CarcaseCreate, CarcaseResponse

router = APIRouter()

@router.post("/carcases", response_model=CarcaseResponse, summary="Создание типа кузова", tags=["Кузова"])
async def create_carcase(
    data: CarcaseCreate,
    db: AsyncSession = Depends(get_session)
):
    return await CarcaseService.create_carcase(data, db)

@router.get("/carcases", response_model=List[CarcaseResponse], summary="Получение всех типов кузовов", tags=["Кузова"])
async def get_all_carcases(
    skip: int = Query(0, description="Пропуск записей"),
    limit: int = Query(100, description="Лимит записей"),
    db: AsyncSession = Depends(get_session)
):
    carcases = await CarcaseService.get_all_carcases(db, skip=skip, limit=limit)
    return carcases