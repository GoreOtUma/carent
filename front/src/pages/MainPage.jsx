import React, { useState } from 'react';
import '../styles/MainPage.css';
import Card from '../components/Card';

const dummyCars = [
  {
    model: 'Totoya Carina',
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
    description: 'Лучшая машина!',
    image: 'https://www.automoli.com/common/vehicles/_assets/img/gallery/f38/toyota-carina-e-t19.jpg',
  },
  {
    model: 'Volkswagen Golf',
    cost: 1000,
    number: 'О111ОО00',
    transmission: 'Механика',
    fuel: 'Бензин',
    trunkVolume: 500,
    engineVolume: 1.8,
    seats: 5,
    mileage: 42000,
    year: 2020,
    color: 'Синий',
    bodyType: 'Седан',
    description: 'Лучшая машина2!',
    image: 'https://auto.vercity.ru/gallery/img/automobiles/Volkswagen/2014%20Volkswagen%20Golf%20R%205-Door%20(ZA)/900x/2014%20Volkswagen%20Golf%20R%205-Door%20(ZA)%20003.jpg',
  },
];

const MainPage = () => {
  const [cars] = useState(dummyCars);

  return (
    <div className="main-page">
      <aside className="filters">
        <div className="filter-group">
          <h3>Дата</h3>
          <div className="filter-item">
            <label>От:</label>
            <input type="text" placeholder="" />
          </div>
          <div className="filter-item">
            <label>До:</label>
            <input type="text" placeholder="" />
          </div>
          <div className="filter-item">
            <label>Цена, ₽:</label>
            <div className="price-range">
              <input type="number" placeholder="Min" />
              <input type="number" placeholder="Макс" />
            </div>
          </div>
        </div>

        <div className="filter-group">
          <h3>Трансмиссия</h3>
          <div className="filter-item">
            <input type="checkbox" id="automatic" />
            <label htmlFor="automatic">Автомат</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" id="manual" />
            <label htmlFor="manual">Механика</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" id="variator" />
            <label htmlFor="variator">Вариатор</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" id="robot" />
            <label htmlFor="robot">Робот</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" id="hybrid" />
            <label htmlFor="hybrid">Гибрид</label>
          </div>
        </div>

        <div className="filter-group">
          <h3>Количество мест</h3>
          <div className="filter-item">
            <input type="checkbox" id="seats2" />
            <label htmlFor="seats2">2</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" id="seats5" />
            <label htmlFor="seats5">5</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" id="seats8" />
            <label htmlFor="seats8">8</label>
          </div>
        </div>

        <div className="filter-group">
          <h3>Пробег, км</h3>
          <div className="filter-item">
            <label>От:</label>
            <input type="number" placeholder="" />
          </div>
          <div className="filter-item">
            <label>До:</label>
            <input type="number" placeholder="" />
          </div>
          <h3>Топливо</h3>
          <div className="filter-item">
            <input type="checkbox" id="electric" />
            <label htmlFor="electric">Электричество</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" id="petrol" />
            <label htmlFor="petrol">Бензин</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" id="diesel" />
            <label htmlFor="diesel">Дизель</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" id="gas" />
            <label htmlFor="gas">Газ</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" id="hybrid-fuel" />
            <label htmlFor="hybrid-fuel">Гибрид</label>
          </div>
        </div>

        <div className="filter-group">
          <h3>Год выпуска</h3>
          <div className="filter-item">
            <label>От:</label>
            <input type="number" placeholder="" />
          </div>
          <div className="filter-item">
            <label>До:</label>
            <input type="number" placeholder="" />
          </div>
          <h3>Цвет</h3>
          <div className="filter-item">
            <input type="checkbox" id="white" />
            <label htmlFor="white">Белый</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" id="blue" />
            <label htmlFor="blue">Синий</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" id="black" />
            <label htmlFor="black">Черный</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" id="red" />
            <label htmlFor="red">Красный</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" id="yellow" />
            <label htmlFor="yellow">Желтый</label>
          </div>
        </div>

        <div className="filter-group">
          <h3>Объём двигателя</h3>
          <div className="filter-item">
            <label>От:</label>
            <input type="number" placeholder="" />
          </div>
          <div className="filter-item">
            <label>До:</label>
            <input type="number" placeholder="" />
          </div>
          <h3>Объём багажника</h3>
          <div className="filter-item">
            <label>От:</label>
            <input type="number" placeholder="" />
          </div>
          <div className="filter-item">
            <label>До:</label>
            <input type="number" placeholder="" />
          </div>
        </div>

        <div className="filter-group">
          <h3>Кузов</h3>
          <div className="filter-item">
            <input type="checkbox" id="sedan" />
            <label htmlFor="sedan">Седки</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" id="hatchback" />
            <label htmlFor="hatchback">Хетчбек</label>
          </div>
          <div className="filter-item">
            <input type="checkbox" id="crossover" />
            <label htmlFor="crossover">Кроссовер</label>
          </div>
        </div>

        <div className="filter-group">
          <h3>Марка автомобиля</h3>
          <select className="brand-select">
            <option value="">Все марки</option>
            <option value="toyota">Toyota</option>
            <option value="honda">Honda</option>
            <option value="bmw">BMW</option>
            <option value="audi">Audi</option>
            <option value="mercedes">Mercedes</option>
            <option value="volkswagen">Volkswagen</option>
            <option value="nissan">Nissan</option>
            <option value="hyundai">Hyundai</option>
            <option value="kia">Kia</option>
            <option value="ford">Ford</option>
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
