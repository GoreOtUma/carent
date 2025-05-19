import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';
import Card from '../components/Card';
import CarService from '../API/CarService';



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
        {cars.map(car => <Card key={car.id_car} {...car} />)
}
      </section>
    </div>
  );
};

export default MainPage;