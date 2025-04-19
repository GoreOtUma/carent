from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from crud import car as CarService
from db.session import get_session
from schemas.car import CarCreate, CarResponse, CarUpdate

router = APIRouter()

@router.post("/cars", response_model=CarResponse, summary="Создание автомобиля", tags=["Автомобили"])
async def create_car(
    data: CarCreate, 
    db: AsyncSession = Depends(get_session)
):
    return await CarService.create_car(data, db)

@router.get("/cars", response_model=List[CarResponse], summary="Получение всех автомобилей", tags=["Автомобили"])
async def get_all_cars(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_session)
):
    cars = await CarService.get_all_cars(db, skip=skip, limit=limit)
    return cars


@router.get("/cars/{car_id}", response_model=CarResponse, summary="Получение автомобиля по ID", tags=["Автомобили"])
async def get_car(
    car_id: int, 
    db: AsyncSession = Depends(get_session)
):
    car = await CarService.get_car(car_id, db)
    if not car:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Автомобиль не найден")
    return car

@router.put("/cars/{car_id}", response_model=CarResponse, summary="Обновление автомобиля", tags=["Автомобили"])
async def update_car(
    car_id: int, 
    data: CarUpdate,
    db: AsyncSession = Depends(get_session)
):
    car = await CarService.update_car(car_id, data, db)
    if not car:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Автомобиль не найден")
    return car

@router.get("/available-cars", response_model=List[CarResponse], summary="Получение доступных автомобилей", tags=["Автомобили"])
async def get_available_cars(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_session)
):
    return await CarService.get_available_cars(db, skip=skip, limit=limit)