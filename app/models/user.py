from datetime import datetime
import enum
from sqlalchemy import String, text, ForeignKey, Column, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Annotated
from db.session import Base, str_128, str_256, str_64

intpk = Annotated[int, mapped_column(primary_key=True)]

class Role(enum.Enum):
    admin = "admin"
    appruved_user = "appruved_user"
    unknown_user = "unknown_user"

class User(Base):
    __tablename__ = 'users'
    
    id:Mapped[intpk]
    name:Mapped[str_128] = mapped_column(nullable=False)
    login: Mapped[str_64] = mapped_column(nullable=False, unique=True)
    password: Mapped[str_64] = mapped_column(nullable=False)
    email: Mapped[str_128] = mapped_column(nullable=False, unique=True)
    role: Mapped[Role] = mapped_column(default=Role.unknown_user)

class Brand(Base):
    __tablename__ = "brands"

    id_brand = Column(Integer, primary_key=True, index=True)
    name_brand = Column(String(50), nullable=False)

class Model(Base):
    __tablename__ = "models"

    id_model = Column(Integer, primary_key=True, index=True)
    name_model = Column(String(50), nullable=False)
    id_brand = Column(Integer, ForeignKey("brands.id_brand"), nullable=False)

    brand = relationship("Brand")