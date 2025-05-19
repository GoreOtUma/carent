import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Contract.css';
import MyButton from '../components/UI/button/MyButton';
import { useAuth } from "../context/AuthContext";

const Contract = () => {
  const { state } = useLocation();
  const carData = state?.carData;
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!carData) {
    navigate('/mainpage');
    return null;
  }

  return (
    <div className="contract-page">
      <div className="contract-container">
        <div className="contract-image-side">
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

        <div className="contract-details-side">
          <h2 className="car-title">{carData.model}</h2>
          <div className="car-detail-list">
            <p><b>Гос. номер:</b> {carData.number || '00000000'}</p>
            <p><b>Трансмиссия:</b> {carData.transmission}</p>
            <p><b>Топливо:</b> {carData.fuel}</p>
            <p><b>Объём багажника:</b> {carData.trunkVolume}</p>
            <p><b>Объём двигателя:</b> {carData.engineVolume}</p>
            <p><b>Количество мест:</b> {carData.seats}</p>
            <p><b>Пробег:</b> {carData.mileage} км</p>
            <p><b>Год выпуска:</b> {carData.year}</p>
            <p><b>Цвет:</b> {carData.color}</p>
            <p><b>Кузов:</b> Седан</p>
            <p><b>Описание:</b> {carData.description}</p>
          </div>

          <div className="form-section">
           
          <div className="date-range">
            <div className="date-input">
              <span>От</span>
              <input type="datetime-local" className="filter-input" />
            </div>
            <div className="date-input">
              <span>До</span>
              <input type="datetime-local" className="filter-input" />
            </div>
          </div>

        <div className="filter-section">
          <h3 className="section-title">Тип страховки</h3>
            <select className="brand-select">
              <option value="basic">Базовая</option>
              <option value="premium">Премиум</option>
            </select>
            </div>

            <div className="price">
              <strong>Стоимость:</strong>
              <span> 5000 ₽</span>
            </div>

             {user?.role === "user" ?
              <MyButton className="auth button-registration " type="button">
                Арендовать
              </MyButton>
              :
              <MyButton 
                className="auth button-registration" 
                type="button"
                onClick={() => navigate('/signin')} 
              >
                Войдите для аренды
              </MyButton>
            }
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contract;