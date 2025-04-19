from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from crud import fuel as FuelService
from db.session import get_session
from schemas.fuel import FuelCreate, FuelResponse

router = APIRouter()

@router.post("/fuels", response_model=FuelResponse, summary="Создание типа топлива", tags=["Топливо"])
async def create_fuel(
    data: FuelCreate,
    db: AsyncSession = Depends(get_session)
):
    return await FuelService.create_fuel(data, db)

@router.get("/fuels", response_model=List[FuelResponse], summary="Получение всех типов топлива", tags=["Топливо"])
async def get_all_fuels(
    skip: int = Query(0, description="Пропуск записей"),
    limit: int = Query(100, description="Лимит записей"),
    db: AsyncSession = Depends(get_session)
):
    return await FuelService.get_all_fuels(db, skip=skip, limit=limit)

@router.get("/fuels/{fuel_id}", response_model=FuelResponse, summary="Получение типа топлива по ID", tags=["Топливо"])
async def get_fuel(
    fuel_id: int,
    db: AsyncSession = Depends(get_session)
):
    fuel = await FuelService.get_fuel(fuel_id, db)
    if not fuel:
        raise HTTPException(status_code=404, detail="Тип топлива не найден")
    return fuel