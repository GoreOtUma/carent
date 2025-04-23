import React from 'react';
import '../styles/Card.css';
import MyButton from '../components/UI/button/MyButton';
import { useNavigate } from 'react-router-dom';

const CarCard = ({image, model, cost, number, transmission, fuel, trunkVolume, engineVolume, seats, mileage, year, color, bodyType, description,}) => {
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
        <div className="date_contr">
          <label>Дата</label>
          <input type="datetime" placeholder="От" />
          <input type="number" placeholder="До" />
        </div>
        <label htmlFor="Insurience">Страховка:</label>
            <select id="ins" name="ins">
                <option value="apple">Яблоко</option>
                <option value="banana">Банан</option>
                <option value="orange">Апельсин</option>
                </select>
        <label htmlFor="">Стоимость:</label>
      <div className="to-rent">
          <MyButton className="button-registration secondary-button auth" type="button" onClick={handleRedirect}>Арендовать</MyButton>
        </div>

    </div>
  );
};
const Contract = () => {
    const cars = [
      {
        model: 'Toyota Carina',
        cost: 1000,
        number: 'О000ОО00',
        transmission: 'Автомат',
        fuel: 'Бензин',
        trunkVolume: 500,
        engineVolume: 1.8,
        seats: 5,
        mileage: 42000,
        year: 2020,
        color: 'Серый',
        bodyType: 'Седан',
        description: 'Описание ля-ля-ля',
        image: 'https://www.automoli.com/common/vehicles/_assets/img/gallery/f38/toyota-carina-e-t19.jpg',
      },
    ];
  
    return (
      <section className="main-page__cards">
        {cars.map((car, idx) => (
          <CarCard key={idx} {...car} />
        ))}
      </section>
    );
};
export default Contract;
