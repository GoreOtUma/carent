from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from crud import insurance as InsuranceService
from db.session import get_session
from schemas.insurance import InsuranceCreate, InsuranceResponse

router = APIRouter()

@router.post("/insurances", response_model=InsuranceResponse, summary="Создание страховки", tags=["Страховки"])
async def create_insurance(
    data: InsuranceCreate,
    db: AsyncSession = Depends(get_session)
):
    return await InsuranceService.create_insurance(data, db)

@router.get("/insurances", response_model=List[InsuranceResponse], summary="Получение всех страховок", tags=["Страховки"])
async def get_all_insurances(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_session)
):
    return await InsuranceService.get_all_insurances(db)[skip:skip+limit]

@router.get("/insurances/{insurance_id}", response_model=InsuranceResponse, summary="Получение страховки по ID", tags=["Страховки"])
async def get_insurance(
    insurance_id: int,
    db: AsyncSession = Depends(get_session)
):
    insurance = await InsuranceService.get_insurance(insurance_id, db)
    if not insurance:
        raise HTTPException(status_code=404, detail="Страховка не найдена")
    return insurance