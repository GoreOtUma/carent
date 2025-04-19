from typing import List
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.user import PriceSeason
from schemas.priceseason import PriceSeasonCreate, PriceSeasonUpdate

async def create_price_season(db: AsyncSession, season_data: PriceSeasonCreate):
    price_season = PriceSeason(**season_data.model_dump())
    db.add(price_season)
    await db.commit()
    await db.refresh(price_season)
    return price_season

async def get_price_season(db: AsyncSession, season_id: int):
    result = await db.execute(
        select(PriceSeason)
        .where(PriceSeason.id_ps == season_id)
    )
    return result.scalar_one_or_none()

async def update_price_season(db: AsyncSession, season_id: int, update_data: PriceSeasonUpdate):
    season = await get_price_season(db, season_id)
    if not season:
        return None
    
    update_data = update_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(season, field, value)
    
    await db.commit()
    await db.refresh(season)
    return season

async def delete_price_season(db: AsyncSession, season_id: int):
    season = await get_price_season(db, season_id)
    if not season:
        return False
    
    await db.delete(season)
    await db.commit()
    return True