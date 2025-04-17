from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from db.session import get_session
from crud import priceseason as priceSeasonService
from schemas.priceseason import PriceSeasonCreate, PriceSeasonResponse, PriceSeasonUpdate

router = APIRouter()

@router.post("/price-seasons", response_model=PriceSeasonResponse, tags=["Сезонные цены"])
async def create_season_price(
    season_data: PriceSeasonCreate,
    db: AsyncSession = Depends(get_session)
):
    return await priceSeasonService.create_price_season(db, season_data)

@router.get("/price-seasons/{season_id}", response_model=PriceSeasonResponse, tags=["Сезонные цены"])
async def read_season_price(
    season_id: int,
    db: AsyncSession = Depends(get_session)
):
    season = await priceSeasonService.get_price_season(db, season_id)
    if not season:
        raise HTTPException(status_code=404, detail="Сезонная цена не найдена")
    return season

@router.get("/cars/{car_id}/price-seasons", response_model=list[PriceSeasonResponse], tags=["Сезонные цены"])
async def read_car_season_prices(
    car_id: int,
    db: AsyncSession = Depends(get_session)
):
    return await priceSeasonService.get_car_seasons(db, car_id)

@router.put("/price-seasons/{season_id}", response_model=PriceSeasonResponse, tags=["Сезонные цены"])
async def update_season_price(
    season_id: int,
    update_data: PriceSeasonUpdate,
    db: AsyncSession = Depends(get_session)
):
    updated = await priceSeasonService.update_price_season(db, season_id, update_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Сезонная цена не найдена")
    return updated

@router.delete("/price-seasons/{season_id}", tags=["Сезонные цены"])
async def delete_season_price(
    season_id: int,
    db: AsyncSession = Depends(get_session)
):
    success = await priceSeasonService.delete_price_season(db, season_id)
    if not success:
        raise HTTPException(status_code=404, detail="Сезонная цена не найдена")
    return {"message": "Сезонная цена успешно удалена"}