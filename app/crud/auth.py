import datetime
import jwt
from fastapi import HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from core.security import verify_password
from models.user import User
from schemas.user import UserLogin
from core.config import settings

secret_key = settings.SECRET_KEY

async def login(data: UserLogin, db: AsyncSession, response: Response):
    try:
        result = await db.execute(select(User).filter(User.email == data.email))

        user = result.scalar_one_or_none()
        
        if not user or not verify_password(data.password, user.password):
            raise HTTPException(status_code=401, detail="Неверный email или пароль")
        
        payload = {
            'user_id': user.id_user,
            'user_role': str(user.role.value),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }
        access_token = jwt.encode(payload, secret_key, algorithm='HS256')

        refresh_payload = {
            'user_id': user.id_user,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=10)
        }
        refresh_token = jwt.encode(refresh_payload, secret_key, algorithm='HS256')

        response.set_cookie(
            key="access",
            value=access_token,
            httponly=True,
            samesite='Lax',
            secure=False,      # на локалке secure=False
        )
        response.set_cookie(
            key="refresh",
            value=refresh_token,
            httponly=True,
            samesite='Lax',
            secure=False,
        )

        return {"access_token": access_token, "refresh_token": refresh_token}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Ошибка входа: {str(e)}")
