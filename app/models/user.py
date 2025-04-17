from datetime import datetime
import enum
from sqlalchemy import String, text, ForeignKey, Column, Integer, Boolean, Numeric, TIMESTAMP, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Annotated, Optional
from db.session import Base, str_128, str_256, str_64

intpk = Annotated[int, mapped_column(primary_key=True)]

class Brand(Base):
    __tablename__ = "brands"

    id_brand: Mapped[intpk]
    name_brand: Mapped[str] = mapped_column(String(50), nullable=False)

    models = relationship("Model", back_populates="brand")

class Model(Base):
    __tablename__ = "models"

    id_model: Mapped[intpk]
    name_model: Mapped[str] = mapped_column(String(50), nullable=False)
    id_brand: Mapped[int] = mapped_column(ForeignKey("brands.id_brand"), nullable=False)

    brand = relationship("Brand", back_populates="models")
    cars = relationship("Car", back_populates="model")

class Fuel(Base):
    __tablename__ = "fuel"

    id_fuel: Mapped[intpk]
    name_fuel: Mapped[str] = mapped_column(String(50), nullable=False)

    cars = relationship("Car", back_populates="fuel")

class Car(Base):
    __tablename__ = "cars"

    id_car: Mapped[intpk]
    png_number: Mapped[str] = mapped_column(String(50))
    id_model: Mapped[int] = mapped_column(ForeignKey("models.id_model"))
    year: Mapped[str] = mapped_column(String(4))
    id_trans: Mapped[int] = mapped_column(ForeignKey("transmissions.id_trans"))
    id_fuel: Mapped[int] = mapped_column(ForeignKey("fuel.id_fuel"))
    id_carcase: Mapped[int] = mapped_column(ForeignKey("carcases.id_carcase"))
    trunk_volume: Mapped[str] = mapped_column(String(5))
    engine_volume: Mapped[str] = mapped_column(String(4))
    seating_capacity: Mapped[str] = mapped_column(String(2))
    color: Mapped[str] = mapped_column(String(50))
    mileage: Mapped[int]
    description: Mapped[Optional[str]] = mapped_column(Text)
    cost_day: Mapped[int]
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    image_path: Mapped[Optional[str]] = mapped_column(String(255))

    model = relationship("Model", back_populates="cars")
    fuel = relationship("Fuel", back_populates="cars")
    transmission = relationship("Transmission", back_populates="cars")
    carcase = relationship("Carcase", back_populates="cars")
    contracts = relationship("Contract", back_populates="car")

    price_seasons = relationship("PriceSeason", back_populates="car")

class Transmission(Base):
    __tablename__ = "transmissions"

    id_trans: Mapped[intpk]
    name_trans: Mapped[str] = mapped_column(String(50), nullable=False)

    cars = relationship("Car", back_populates="transmission")

class Carcase(Base):
    __tablename__ = "carcases"

    id_carcase: Mapped[intpk]
    name_carcase: Mapped[str] = mapped_column(String(50), nullable=False)

    cars = relationship("Car", back_populates="carcase")

class User(Base):
    __tablename__ = "users"

    id_user: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)  # Явное указание primary_key
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    telephone: Mapped[str] = mapped_column(String(15), nullable=False)
    passport: Mapped[str] = mapped_column(String(20), nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(50), default="user")

    contracts = relationship("Contract", back_populates="user")

class Insurance(Base):
    __tablename__ = "insurance"

    id_insurance: Mapped[intpk]
    type_in: Mapped[str] = mapped_column(String(50), nullable=False)
    cost: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)

    contracts = relationship("Contract", back_populates="insurance")

class Contract(Base):
    __tablename__ = "contracts"

    id_contract: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    id_user: Mapped[int] = mapped_column(Integer, ForeignKey("users.id_user"), nullable=False)
    id_car: Mapped[int] = mapped_column(ForeignKey("cars.id_car"), nullable=False)
    start_date: Mapped[datetime] = mapped_column(TIMESTAMP, nullable=False)
    end_date: Mapped[datetime] = mapped_column(TIMESTAMP, nullable=False)
    total_cost: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    id_insurance: Mapped[Optional[int]] = mapped_column(ForeignKey("insurance.id_insurance"), nullable=True)  # Изменено на nullable=True
    status: Mapped[str] = mapped_column(String(50), default="active")

    user = relationship("User", back_populates="contracts")
    car = relationship("Car", back_populates="contracts")
    insurance = relationship("Insurance", back_populates="contracts")
    return_info = relationship("ReturnCar", back_populates="contract", uselist=False)

class DiscountDays(Base):
    __tablename__ = "discount_days"

    id_discount: Mapped[intpk]
    count_day: Mapped[int]
    day_from: Mapped[str] = mapped_column(String(5), nullable=False)
    day_to: Mapped[str] = mapped_column(String(5), nullable=False)
    costf: Mapped[float] = mapped_column(Numeric(3, 2), nullable=False)

class ReturnCar(Base):
    __tablename__ = "return_car"
    
    id_return = Column(Integer, primary_key=True, index=True)
    id_contract = Column(Integer, ForeignKey("contracts.id_contract"), nullable=False)
    return_date = Column(TIMESTAMP, default=datetime.utcnow)
    condition = Column(String(100))
    fuel_level = Column(Numeric(3,1))
    mileage_after = Column(Integer)
    notes = Column(Text)
    fine_amount = Column(Numeric(10,2), default=0)
    
    contract = relationship("Contract", back_populates="return_info")

class PriceSeason(Base):
    __tablename__ = "price_season"
    
    id_season = Column(Integer, primary_key=True, index=True)
    id_car = Column(Integer, ForeignKey("cars.id_car"), nullable=False)
    season_name = Column(String(50), nullable=False)
    start_date = Column(TIMESTAMP, nullable=False)
    end_date = Column(TIMESTAMP, nullable=False)
    price_multiplier = Column(Numeric(3,2), nullable=False)
    
    car = relationship("Car", back_populates="price_seasons")