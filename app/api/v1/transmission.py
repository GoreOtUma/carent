from typing import List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from crud import transmission as TransmissionService
from db.session import get_session
from schemas.transmission import TransmissionCreate, TransmissionResponse

router = APIRouter()

@router.post("/transmissions", response_model=TransmissionResponse, summary="Создание типа трансмиссии", tags=["Трансмиссии"])
async def create_transmission(
    data: TransmissionCreate,
    db: AsyncSession = Depends(get_session)
):
    return await TransmissionService.create_transmission(data, db)

@router.get("/transmissions", response_model=List[TransmissionResponse], summary="Получение всех типов трансмиссий", tags=["Трансмиссии"])
async def get_all_transmissions(
    skip: int = Query(0, description="Пропуск записей"),
    limit: int = Query(100, description="Лимит записей"),
    db: AsyncSession = Depends(get_session)
):
    return await TransmissionService.get_all_transmissions(db, skip=skip, limit=limit)
