from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from crud import contract as ContractService
from db.session import get_session
from schemas.contract import ContractCreate, ContractUpdate, ContractResponse

router = APIRouter()


@router.post("/contracts", response_model=ContractResponse, summary="Создание контракта", tags=["Контракты"])
async def create_contract(
    data: ContractCreate, 
    db: AsyncSession = Depends(get_session)
):
    return await ContractService.create_contract(data, db)

@router.get("/contracts/{contract_id}", response_model=ContractResponse, summary="Получение контракта по ID", tags=["Контракты"])
async def get_contract(
    contract_id: int, 
    db: AsyncSession = Depends(get_session)
):
    contract = await ContractService.get_contract(contract_id, db)
    if not contract:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Контракт не найден")
    return contract

@router.get("/users/{user_id}/contracts", response_model=List[ContractResponse], summary="Получение контрактов пользователя", tags=["Контракты"])
async def get_user_contracts(
    user_id: int,
    db: AsyncSession = Depends(get_session)
):
    return await ContractService.get_user_contracts(user_id, db)

@router.put("/contracts/{contract_id}", response_model=ContractResponse, summary="Обновление контракта", tags=["Контракты"])
async def update_contract(
    contract_id: int,
    data: ContractUpdate,
    db: AsyncSession = Depends(get_session)
):
    contract = await ContractService.update_contract(contract_id, data, db)
    if not contract:
        raise HTTPException(status_code=404, detail="Контракт не найден")
    return contract

@router.patch("/contracts/{contract_id}/status", response_model=ContractResponse, summary="Изменение статуса контракта", tags=["Контракты"])
async def update_contract_status(
    contract_id: int,
    status: str = Query(..., description="Новый статус контракта"),
    db: AsyncSession = Depends(get_session)
):
    contract = await ContractService.get_contract(contract_id, db)
    if not contract:
        raise HTTPException(status_code=404, detail="Контракт не найден")
    
    contract.status = status
    try:
        await db.commit()
        await db.refresh(contract)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=f"Ошибка при обновлении статуса: {str(e)}")
    
    return contract