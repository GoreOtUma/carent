from datetime import datetime
import enum
from sqlalchemy import String, text, ForeignKey, Column, Integer, Boolean, Numeric, TIMESTAMP, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Annotated, Optional
from db.session import Base, str_128, str_256, str_64
from sqlalchemy import Enum as SQLEnum 

intpk = Annotated[int, mapped_column(primary_key=True)]

class Role(enum.Enum):
    user = "user"
    worker = "worker"
    manager = "manager"

class CarStatus(enum.Enum):
    free = "free"
    booked = "booked"
    inrent = "inrent"
    repair = "repair"
    off = "off"

class ContractStatus(enum.Enum):
    created = "created"
    approved = "approved"
    closed = "closed"

class Brand(Base):
    __tablename__ = "brands"

    id_brand: Mapped[intpk]
    name_brand: Mapped[str] = mapped_column(String(50), nullable=False)

    models = relationship("Model", back_populates="brand")

class Model(Base):
    __tablename__ = "models"

    id_model: Mapped[intpk]
    id_brand: Mapped[int] = mapped_column(ForeignKey("brands.id_brand"), nullable=False)
    name_model: Mapped[str] = mapped_column(String(50), nullable=False)
    
    brand = relationship("Brand", lazy="selectin")
    cars = relationship("Car", back_populates="model")

class Fuel(Base):
    __tablename__ = "fuel"

    id_fuel: Mapped[intpk]
    name_fuel: Mapped[str] = mapped_column(String(50), nullable=False)

    cars = relationship("Car", back_populates="fuel")

class Car(Base):
    __tablename__ = "cars"

    id_car: Mapped[intpk]
    gos_number: Mapped[str] = mapped_column(String(50))
    id_model: Mapped[int] = mapped_column(ForeignKey("models.id_model"))
    year: Mapped[int]
    id_trans: Mapped[int] = mapped_column(ForeignKey("transmissions.id_trans"))
    id_fuel: Mapped[int] = mapped_column(ForeignKey("fuel.id_fuel"))
    id_carcase: Mapped[int] = mapped_column(ForeignKey("carcases.id_carcase"))
    trunk_volume: Mapped[int]
    engine_volume: Mapped[int]
    seating_capacity: Mapped[int]
    color: Mapped[str] = mapped_column(String(50))
    mileage: Mapped[int]
    description: Mapped[Optional[str]] = mapped_column(Text)
    cost_day: Mapped[int]
    is_rented: Mapped[CarStatus] = mapped_column(SQLEnum(CarStatus, name="carstatus"), default=CarStatus.free)
    image_path: Mapped[Optional[str]] = mapped_column(String(255))

    model = relationship("Model", back_populates="cars")
    fuel = relationship("Fuel", back_populates="cars")
    transmission = relationship("Transmission", back_populates="cars")
    carcase = relationship("Carcase", back_populates="cars")
    
    returns = relationship("ReturnCar", back_populates="car")
    
    contracts = relationship("Contract", back_populates="car")

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

    id_user: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    f_name: Mapped[str] = mapped_column(String(50), nullable=False)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    l_name: Mapped[str] = mapped_column(String(50), nullable=False)
    telephone: Mapped[int] = mapped_column(Numeric(11), nullable=False)
    n_passport: Mapped[int] = mapped_column(Numeric(7), nullable=False)
    s_passport: Mapped[int] = mapped_column(Numeric(5), nullable=False)
    n_vu: Mapped[int] = mapped_column(Numeric(11), nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[Role] = mapped_column(SQLEnum(Role, name="role", create_constraint=False), default=Role.user)





    returns = relationship("ReturnCar", back_populates="user")
    
    contracts = relationship("Contract", back_populates="user")

class Insurance(Base):
    __tablename__ = "insurance"

    id_ins: Mapped[intpk]
    type_ins: Mapped[str] = mapped_column(String(50), nullable=False)
    cost: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)

    contracts = relationship("Contract", back_populates="insurance")

class Contract(Base):
    __tablename__ = "contracts"

    id_contr: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    id_user: Mapped[int] = mapped_column(Integer, ForeignKey("users.id_user"), nullable=False)
    id_car: Mapped[int] = mapped_column(ForeignKey("cars.id_car"), nullable=False)
    start_date: Mapped[datetime] = mapped_column(TIMESTAMP, nullable=False)
    end_date: Mapped[datetime] = mapped_column(TIMESTAMP, nullable=False)
    total_cost: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    id_ins: Mapped[Optional[int]] = mapped_column(ForeignKey("insurance.id_ins"), nullable=True) 
    status: Mapped[ContractStatus] = mapped_column(SQLEnum(ContractStatus, name="contractstatus", create_constraint=True), nullable=False, default=ContractStatus.created)


    user = relationship("User", back_populates="contracts", lazy="selectin")
    car = relationship("Car", back_populates="contracts", lazy="selectin")
    insurance = relationship("Insurance", back_populates="contracts", lazy="selectin")
    return_info = relationship("ReturnCar", back_populates="contract", uselist=False, lazy="selectin")

class DiscountDays(Base):
    __tablename__ = "discount_days"

    id_ds: Mapped[intpk]
    count_day: Mapped[int]
    coeff: Mapped[float] = mapped_column(Numeric(3, 2), nullable=False)

class ReturnCar(Base):
    __tablename__ = "return_car"
    
    id_ret = Column(Integer, primary_key=True, index=True)
    id_car = Column(Integer, ForeignKey("cars.id_car"), nullable=False)
    id_user = Column(Integer, ForeignKey("users.id_user"), nullable=False)
    id_contr = Column(Integer, ForeignKey("contracts.id_contr"), nullable=False)
    date_return = Column(TIMESTAMP)
    
    car = relationship("Car", back_populates="returns")
    user = relationship("User", back_populates="returns")
    contract = relationship("Contract", back_populates="return_info")

class PriceSeason(Base):
    __tablename__ = "price_season"
    
    id_ps = Column(Integer, primary_key=True, index=True)
    day_to = Column(TIMESTAMP, nullable=False)
    day_from = Column(TIMESTAMP, nullable=False)
    coeff: Mapped[float] = mapped_column(Numeric(3, 2), nullable=False)