import React from 'react';
import '../styles/Card.css';
import MyButton from './UI/button/MyButton';
import { useNavigate } from 'react-router-dom';

const Card = ({image, model, cost, number, transmission, fuel, trunkVolume, engineVolume, seats, mileage, year, color, bodyType, description,}) => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/contract');
  };
  return (
    <div className="card">
      <div className="card__header">
        <span className="card__name">{model}</span>
        <span className="card__cost">{cost}</span>
      </div>
      <div>
        <img className="card__image" src={image} alt={model} />
      </div>
      <div className="card__body">
        <p><b>Гос. номер:</b> {number}</p>
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
          <MyButton className="button-registration secondary-button auth" type="button" onClick={handleRedirect}>Арендовать</MyButton>
        </div>
    </div>
  );
};

export default Card;
