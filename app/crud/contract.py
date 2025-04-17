from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from models.user import Contract
from schemas.contract import ContractCreate, ContractUpdate


async def create_contract(data: ContractCreate, db: AsyncSession) -> Contract:
    contract = Contract(
        id_user=data.id_user,
        id_car=data.id_car,
        start_date=data.start_date,
        end_date=data.end_date,
        total_cost=data.total_cost,
        id_insurance=data.id_insurance,
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
            selectinload(Contract.car),
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
            selectinload(Contract.car),
            selectinload(Contract.insurance)
        )
        .where(Contract.id_contract == contract_id)
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
    for field, value in update_data.items():
        setattr(contract, field, value)
    
    try:
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