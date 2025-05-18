import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Contract.css';
import MyButton from '../components/UI/button/MyButton';

const Contract = () => {
  const { state } = useLocation();
  const carData = state?.carData;
  const navigate = useNavigate();

  if (!carData) {
    navigate('/mainpage');
    return null;
  }

  return (
    <div className="contract-page">

      <div className="contract-container">
        <div className="car-info">
          <div className="car-image-container">
            <img 
              src={carData.image} 
              alt={carData.model}
              className="car-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
              }}
            />
          </div>
          
          <h2>{carData.model}</h2>
          
          <div className="car-details">
            <p><b>Гос. номер:</b> {carData.number || 'не указан'}</p>
            <p><b>Трансмиссия:</b> {carData.transmission}</p>
            <p><b>Топливо:</b> {carData.fuel}</p>
            <p><b>Объём багажника:</b> {carData.trunkVolume} л</p>
            <p><b>Объём двигателя:</b> {carData.engineVolume} л</p>
            <p><b>Количество мест:</b> {carData.seats}</p>
            <p><b>Пробег:</b> {carData.mileage} км</p>
            <p><b>Год выпуска:</b> {carData.year}</p>
            <p><b>Цвет:</b> {carData.color}</p>
            <p><b>Кузов:</b> {carData.bodyType}</p>
            <p><b>Описание:</b> {carData.description}</p>
          </div>
        </div>

        <div className="contract-form">
          <div className="form-group">
            <label>Дата</label>
            <div className="date-inputs">
              <input type="datetime-local" placeholder="От" />
              <input type="datetime-local" placeholder="До" />
            </div>
          </div>

          <div className="form-group">
            <label>Тип страховки</label>
            <select>
              <option value="">Выберите страховку</option>
              <option value="basic">Базовая</option>
              <option value="premium">Премиум</option>
              <option value="full">Полная</option>
            </select>
          </div>

          <div className="price-section">
            <h3>Стоимость:</h3>
            <p className="price">{carData.cost} ₽</p>
          </div>

          <MyButton 
            className="rent-button" 
            type="button"
          >
            Арендовать
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default Contract;