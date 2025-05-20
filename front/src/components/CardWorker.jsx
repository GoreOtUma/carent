import React, { useState } from 'react';
import '../styles/Card.css';
import MyButton from '../components/UI/button/MyButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const CardWorker = ({
  id,
  image_path,
  model,
  cost_day,
  gos_number,
  transmission,
  fuel,
  trunk_volume,
  engine_volume,
  seating_capacity,
  mileage,
  year,
  color,
  carcase,
  description,
  is_rented,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRentClick = (e) => {
    e.stopPropagation();
      navigate('/contract', { 
        state: {
          carData: {
            id,
            image_path,
            model,
            cost_day,
            gos_number,
            transmission,
            fuel,
            trunk_volume,
            engine_volume,
            seating_capacity,
            mileage,
            year,
            color,
            carcase,
            description, 
            is_rented,
          }
        }
      });
  };

    const getStatusInRussian = (status) => {
    switch(status) {
      case 'free': 
        return 'Свободен';
      case 'booked': 
        return 'Забронирован';
      case 'inrent': 
        return 'В аренде';
      case 'repair': 
        return 'В ремонте';
      case 'off': 
        return 'Недоступен';
      default: 
        return 'Неизвестный статус';
    }
  };

  return (
    <div className={`card ${isExpanded ? 'expanded' : ''}`} onClick={handleCardClick}>
      <div className="card__header">
        <span className="card__name">{model.brand.name_brand + model.name_model}</span>
        <span className="card__cost">{cost_day} ₽</span>
      </div>
      
      <div className="card__image-container">
        <img 
          className="card__image" 
          src={image_path} 
          alt={model.name_modell}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>
      
      {isExpanded && (
        <>
          <div className="card__body">
            <p><b>Гос. номер:</b> {gos_number || 'Не указан'}</p>
            <p><b>Год:</b> {year}</p>
            <p><b>Трансмиссия:</b> {transmission.name_trans}</p>
            <p><b>Топливо:</b> {fuel.name_fuel}</p>
            <p><b>Объём багажника:</b> {trunk_volume} л</p>
            <p><b>Объём двигателя:</b> {engine_volume} л</p>
            <p><b>Количество мест:</b> {seating_capacity}</p>
            <p><b>Пробег:</b> {mileage} км</p>
            <p><b>Цвет:</b> {color}</p>
            <p><b>Кузов:</b> {carcase.name_carcase}</p>
            <p><b>Описание:</b> {description}</p>
            <p><b>Статус: </b>{getStatusInRussian(is_rented)}</p>
          </div>
           {user?.role !== "worker" ?
            <div className="to-rent">
              <MyButton 
                className="button-registration auth" 
                type="button"
                onClick={handleRentClick}
              >
                Арендовать
              </MyButton>
            </div>
            :
            <></>}
        </>
      )}
    </div>
  );
};

export default CardWorker;