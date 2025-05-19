import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';
import Card from '../components/Card';
import CarService from '../API/CarService';

const dummyCars = [
  {
    /*model: 'Volkswagen Golf',
    cost: 1000,
    number: 'А870СУ43',
    transmission: 'Механика',
    fuel: 'Бензин',
    trunkVolume: '500л',
    engineVolume: '1.6л',
    seats: 5,
    mileage: 99000,
    year: 2004,
    color: 'Синий',
    bodyType: 'Хэтчбэк',
    description: 'Лучшая машина!',
    image: 'https://auto.vercity.ru/gallery/img/automobiles/Volkswagen/2014%20Volkswagen%20Golf%20R%205-Door%20(ZA)/900x/2014%20Volkswagen%20Golf%20R%205-Door%20(ZA)%20003.jpg',
  },
{
    model: 'Honda Accord',
    cost: 1500,
    number: 'А224АС43',
    transmission: 'Автомат',
    fuel: 'бензин',
    trunkVolume: '200л',
    engineVolume: '2.4л',
    seats: 5,
    mileage: '2000 км',
    year: 2008,
    color: 'Белый',
    bodyType: 'Седан',
    description: 'Пушка - гонка',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Honda_Accord_%282008%29_front.JPG',
  },
{
    model: 'ВАЗ 2109',
    cost: 400,
    number: 'А087АС69',
    transmission: 'Механика',
    fuel: 'бензин',
    trunkVolume: '200л',
    engineVolume: '1.6л',
    seats: 5,
    mileage: '150000 км',
    year: 2004,
    color: 'Черный',
    bodyType: 'Седан',
    description: 'На дачу хороший вариант',
    image: 'https://kotsport.ru/wp-content/uploads/2023/12/deviatka-vaz-2109-1.webp',
  },
{
    model: 'ГАЗ 2705',
    cost: 800,
    number: 'У087АС69',
    transmission: 'Механика',
    fuel: 'дизель',
    trunkVolume: '800л',
    engineVolume: '2.8л',
    seats: 3,
    mileage: '250000 км',
    year: 2004,
    color: 'Синий',
    bodyType: 'Грузовой',
    description: 'Для переезда',
    image: 'https://st15.stblizko.ru/images/product/060/131/773_big.png',
  },
{
    model: 'Texla X',
    cost: 3000,
    number: 'У111АС77',
    transmission: 'Механика',
    fuel: 'электро',
    trunkVolume: '400л',
    engineVolume: '2.0л',
    seats: 5,
    mileage: '2000 км',
    year: 2020,
    color: 'Белый',
    bodyType: 'Кроссовер',
    description: 'Прикоснись к технологиям',
    image: 'https://moscowteslaclub.ru/upload/iblock/e4f/e4f8448f5597fd9af189a8b68d705da1.jpg',
*/},
];

const MainPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await CarService.getAll(); // или getAll() если без фильтра
        setCars(data);
      } catch (error) {
        console.error("Ошибка при загрузке машин:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="main-page">
      <aside className="filters">
        <div className="filter-section">
          <h3 className="section-title">Даты аренды</h3>
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
        </div>

        <div className="filter-section">
          <h3 className="section-title">Цена, ₽</h3>
          <div className="price-range">
            <input type="number" className="filter-input" placeholder="Min" />
            <span>-</span>
            <input type="number" className="filter-input" placeholder="Max" />
          </div>
        </div>

        <div className="filter-section">
          <h3 className="section-title">Трансмиссия</h3>
          {['Автомат', 'Механика', 'Вариатор', 'Робот', 'Гибрид'].map((type) => (
            <label key={type} className="checkbox-item">
              <input type="checkbox" />
              <span className="checkmark"></span>
              {type}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3 className="section-title">Количество мест</h3>
          {['2', '5', '8'].map((seats) => (
            <label key={seats} className="checkbox-item">
              <input type="checkbox" />
              <span className="checkmark"></span>
              {seats}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3 className="section-title">Пробег, км</h3>
          <div className="range-inputs">
            <input type="number" className="filter-input" placeholder="От" />
            <input type="number" className="filter-input" placeholder="До" />
          </div>
        </div>

        <div className="filter-section">
          <h3 className="section-title">Топливо</h3>
          {['Электричество', 'Бензин', 'Дизель', 'Газ', 'Гибрид'].map((fuel) => (
            <label key={fuel} className="checkbox-item">
              <input type="checkbox" />
              <span className="checkmark"></span>
              {fuel}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3 className="section-title">Год выпуска</h3>
          <div className="range-inputs">
            <input type="number" className="filter-input" placeholder="От" />
            <input type="number" className="filter-input" placeholder="До" />
          </div>
        </div>

        <div className="filter-section">
          <h3 className="section-title">Цвет</h3>
          {['Белый', 'Синий', 'Черный', 'Красный', 'Желтый'].map((color) => (
            <label key={color} className="checkbox-item">
              <input type="checkbox" />
              <span className="checkmark"></span>
              {color}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3 className="section-title">Объём двигателя</h3>
          <div className="range-inputs">
            <input type="number" className="filter-input" placeholder="От" />
            <input type="number" className="filter-input" placeholder="До" />
          </div>
        </div>

        <div className="filter-section">
          <h3 className="section-title">Объём багажника</h3>
          <div className="range-inputs">
            <input type="number" className="filter-input" placeholder="От" />
            <input type="number" className="filter-input" placeholder="До" />
          </div>
        </div>

        <div className="filter-section">
          <h3 className="section-title">Кузов</h3>
          {['Седан', 'Хетчбек', 'Кроссовер'].map((body) => (
            <label key={body} className="checkbox-item">
              <input type="checkbox" />
              <span className="checkmark"></span>
              {body}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3 className="section-title">Марка автомобиля</h3>
          <select className="brand-select">
            <option value="">Все марки</option>
            {['Toyota', 'Honda', 'BMW', 'Audi', 'Mercedes', 'Volkswagen', 'Nissan', 'Hyundai', 'Kia', 'Ford'].map((brand) => (
              <option key={brand} value={brand.toLowerCase()}>{brand}</option>
            ))}
          </select>
        </div>
      </aside>

      <section className="main-page__cards">
        {cars.map((car, idx) => (
          <Card key={idx} {...car} />
        ))}
      </section>
    </div>
  );
};

export default MainPage;