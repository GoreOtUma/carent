from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload, joinedload
from models.user import Contract, Car
from schemas.contract import ContractCreate, ContractUpdate
from models.user import Car, ReturnCar  # Уточни путь
from schemas.returncar import ReturnCarCreate  # Уточни путь
from datetime import datetime


async def create_contract(data: ContractCreate, db: AsyncSession) -> Contract:
    # Проверка корректности дат
    if data.end_date <= data.start_date:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Дата окончания должна быть позже даты начала"
        )

    # Находим машину с подгрузкой связей
    car_result = await db.execute(
        select(Car)
        .options(
            selectinload(Car.model),
            selectinload(Car.transmission),
            selectinload(Car.fuel),
            selectinload(Car.carcase)
        )
        .where(Car.id_car == data.id_car)
    )
    car = car_result.scalar_one_or_none()
    if not car:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Машина не найдена"
        )
    car.is_rented = "booked"

    # Создаем контракт
    contract = Contract(
        id_user=data.id_user,
        id_car=data.id_car,
        start_date=data.start_date,
        end_date=data.end_date,
        total_cost=data.total_cost,
        id_ins=data.id_ins,
        status=data.status
    )

    try:
        db.add(contract)
        await db.commit()
        await db.refresh(contract)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при создании контракта: {str(e)}"
        )
    return contract


async def get_user_contracts(user_id: int, db: AsyncSession) -> List[Contract]:
    result = await db.execute(
        select(Contract)
        .options(
            selectinload(Contract.user),
            selectinload(Contract.car).selectinload(Car.model),
            selectinload(Contract.car).selectinload(Car.fuel),
            selectinload(Contract.car).selectinload(Car.transmission),
            selectinload(Contract.car).selectinload(Car.carcase),
            selectinload(Contract.insurance)
        )
        .where(Contract.id_user == user_id)
    )
    return result.scalars().all()

async def get_contract(contract_id: int, db: AsyncSession) -> Optional[Contract]:
    result = await db.execute(
        select(Contract)
        .options(
            selectinload(Contract.user),
            selectinload(Contract.car).selectinload(Car.model),
            selectinload(Contract.car).selectinload(Car.fuel),
            selectinload(Contract.car).selectinload(Car.transmission),
            selectinload(Contract.car).selectinload(Car.carcase),
            selectinload(Contract.insurance)
        )
        .where(Contract.id_contr == contract_id)
    )
    return result.scalar_one_or_none()

async def get_all_contracts(db: AsyncSession) -> List[Contract]:
    result = await db.execute(
        select(Contract)
        .options(
            selectinload(Contract.user),
            selectinload(Contract.car),
            selectinload(Contract.insurance)
        )
    )
    return result.scalars().all()



async def update_contract(contract_id: int, data: ContractUpdate, db: AsyncSession) -> Optional[Contract]:
    contract = await get_contract(contract_id, db)
    if not contract:
        return None

    update_data = data.model_dump(exclude_unset=True)
    change_type = update_data.pop("change_type", None)

    for field, value in update_data.items():
        setattr(contract, field, value)

    try:
        # Явно загружаем машину из БД
        car = await db.get(Car, contract.id_car)

        if change_type == "approve":
            car.is_rented = "inrent"

        elif change_type == "close":
            car.is_rented = "free"
            return_data = ReturnCar(
                id_car=contract.id_car,
                id_user=contract.id_user,
                id_contr=contract.id_contr,
                date_return=datetime.utcnow()
            )
            db.add(return_data)

        await db.commit()
        await db.refresh(contract)
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при обновлении контракта: {str(e)}"
        )

    return contract


async def delete_contract(contract_id: int, db: AsyncSession) -> bool:
    contract = await get_contract(contract_id, db)
    if not contract:
        return False
    
    try:
        await db.delete(contract)
        await db.commit()
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка при удалении контракта: {str(e)}"
        )
    return True
async def get_all_contracts(
    db: AsyncSession,
    skip: int = 0,
    limit: int = 100
) -> List[Contract]:
    result = await db.execute(
        select(Contract)
        .options(
            selectinload(Contract.user),
            selectinload(Contract.car).selectinload(Car.model),
            selectinload(Contract.car).selectinload(Car.fuel),
            selectinload(Contract.car).selectinload(Car.transmission),
            selectinload(Contract.car).selectinload(Car.carcase),
            selectinload(Contract.insurance)
        )
        .order_by(Contract.start_date.desc())
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()