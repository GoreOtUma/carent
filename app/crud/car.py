from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from models.user import Car
from schemas.car import CarCreate, CarUpdate

async def create_car(data: CarCreate, db: AsyncSession) -> Car:
    car = Car(
        png_number=data.png_number,
        id_model=data.id_model,
        year=data.year,
        id_trans=data.id_trans,
        id_fuel=data.id_fuel,
        id_sarcase=data.id_sarcase,
        trunk_volume=data.trunk_volume,
        engine_volume=data.engine_volume,
        seating_capacity=data.seating_capacity,
        color=data.color,
        mileage=data.mileage,
        description=data.description,
        cost_day=data.cost_day,
        is_active=data.is_active,
        image_path=data.image_path
    )
    
    try:
        db.add(car)
        await db.commit()
        await db.refresh(car)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при создании автомобиля: {str(e)}"
        )
    return car

async def get_car(car_id: int, db: AsyncSession) -> Optional[Car]:
    result = await db.execute(
        select(Car)
        .options(
            selectinload(Car.model),
            selectinload(Car.transmission),
            selectinload(Car.fuel),
            selectinload(Car.sarcase)
        )
        .where(Car.id_car == car_id)
    )
    return result.scalar_one_or_none()

async def get_available_cars(db: AsyncSession) -> List[Car]:
    result = await db.execute(
        select(Car)
        .options(
            selectinload(Car.model),
            selectinload(Car.transmission),
            selectinload(Car.fuel),
            selectinload(Car.sarcase)
        )
        .where(Car.is_active == True)
    )
    return result.scalars().all()

async def update_car(car_id: int, data: CarUpdate, db: AsyncSession) -> Optional[Car]:
    car = await get_car(car_id, db)
    if not car:
        return None
    
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(car, field, value)
    
    try:
        await db.commit()
        await db.refresh(car)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при обновлении автомобиля: {str(e)}"
        )
    return car

async def delete_car(car_id: int, db: AsyncSession) -> bool:
    car = await get_car(car_id, db)
    if not car:
        return False
    
    try:
        await db.delete(car)
        await db.commit()
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при удалении автомобиля: {str(e)}"
        )
    return True
