from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from db.session import get_session
from schemas.returncar import ReturnCarCreate, ReturnCarResponse, ReturnCarUpdate
from crud import returncar as ReturnCarService 

router = APIRouter()

@router.post("/returns", response_model=ReturnCarResponse, summary="Создание возврата", tags=["Возвраты автомобилей"])
async def create_return(
    return_data: ReturnCarCreate,
    db: AsyncSession = Depends(get_session)
):
    return await ReturnCarService.create_return_car(db, return_data)

@router.get("/returns/{return_id}", response_model=ReturnCarResponse, summary="Получение записи о возврате по id", tags=["Возвраты автомобилей"])
async def read_return(
    return_id: int,
    db: AsyncSession = Depends(get_session)
):
    return_record = await ReturnCarService.get_return_car(db, return_id)
    if not return_record:
        raise HTTPException(status_code=404, detail="Запись о возврате не найдена")
    return return_record

@router.put("/returns/{return_id}", response_model=ReturnCarResponse, summary="Редактирование записи о возврате по id", tags=["Возвраты автомобилей"])
async def update_return(
    return_id: int,
    update_data: ReturnCarUpdate,
    db: AsyncSession = Depends(get_session)
):
    updated = await ReturnCarService.update_return_car(db, return_id, update_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Запись о возврате не найдена")
    return updated
