from fastapi import APIRouter, Depends, HTTPException, Request, Response
from sqlalchemy.ext.asyncio import AsyncSession
from models.user import User
from core.security import get_current_user, get_refresh, update_tokens
from crud import auth as AuthService
from db.session import get_session
from schemas.user import UserLogin

router = APIRouter()

@router.post("/auth", summary="Вход", tags=["Авторизация"])
async def login_handler(
    data: UserLogin,
    response: Response,
    db: AsyncSession = Depends(get_session)
):
    return await AuthService.login(data, db, response)

@router.get("/protected", summary="Защищённый маршрут", tags=["Авторизация"])
async def protected_route(current_user: dict = Depends(get_current_user)):
    if current_user['user_role'] == 'admin':
        return {"message": "Access granted", "user": current_user}
    raise HTTPException(status_code=403, detail="Access forbidden")

@router.post("/refresh", summary="Обновить токены", tags=["Авторизация"])
async def refresh_access_token(
    response: Response,
    db: AsyncSession = Depends(get_session),
    current_user: dict = Depends(get_refresh)
):
    return await update_tokens(response=response, current_user=current_user, db=db)
