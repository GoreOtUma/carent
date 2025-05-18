import React, { useState } from 'react';
import '../styles/Card.css';
import MyButton from '../components/UI/button/MyButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const Card = ({
  id,
  image,
  model,
  cost,
  number,
  transmission,
  fuel,
  trunkVolume,
  engineVolume,
  seats,
  mileage,
  year,
  color,
  bodyType,
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRentClick = (e) => {
    e.stopPropagation();
    if (user?.role === "user") {
      navigate('/contract', { 
        state: {
          carData: {
            id,
            image,
            model,
            cost,
            number,
            transmission,
            fuel,
            trunkVolume,
            engineVolume,
            seats,
            mileage,
            year,
            color,
            bodyType,
            description
          }
        }
      });
    } else {
      navigate('/signin'); // Перенаправляем на страницу входа
    }
  };

  return (
    <div className={`card ${isExpanded ? 'expanded' : ''}`} onClick={handleCardClick}>
      <div className="card__header">
        <span className="card__name">{model}</span>
        <span className="card__cost">{cost} ₽</span>
      </div>
      
      <div className="card__image-container">
        <img 
          className="card__image" 
          src={image} 
          alt={model}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>
      
      {isExpanded && (
        <>
          <div className="card__body">
            <p><b>Гос. номер:</b> {number || 'Не указан'}</p>
            <p><b>Год:</b> {year}</p>
            <p><b>Трансмиссия:</b> {transmission}</p>
            <p><b>Топливо:</b> {fuel}</p>
            <p><b>Объём багажника:</b> {trunkVolume} л</p>
            <p><b>Объём двигателя:</b> {engineVolume} л</p>
            <p><b>Количество мест:</b> {seats}</p>
            <p><b>Пробег:</b> {mileage} км</p>
            <p><b>Цвет:</b> {color}</p>
            <p><b>Кузов:</b> {bodyType}</p>
            <p><b>Описание:</b> {description}</p>
          </div>
          <div className="to-rent">
            <MyButton 
              className="button-registration auth" 
              type="button"
              onClick={handleRentClick}
              disabled={!user || user.role !== "user"}
            >
              {(user?.role === "user" || user?.role === "worker" ) ? "Арендовать" : "Войдите для аренды"}
            </MyButton>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;