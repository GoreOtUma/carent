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
    description: 'Описание ля-ля-ля',
    image: 'https://www.automoli.com/common/vehicles/_assets/img/gallery/f38/toyota-carina-e-t19.jpg',
  },
];

const MainPage = () => {
  const [cars] = useState(dummyCars);

  return (
    <div className="main-page">
      <aside className="filters">
        <h3>Фильтры</h3>
        <div className="filter_cost">
          <label>Цена</label>
          <input type="number" placeholder="От" />
          <input type="number" placeholder="До" />
        </div>

        <div className="filter_trans">
          <label>Трансмиссия</label>
          <div><input type="checkbox" /> Автомат</div>
          <div><input type="checkbox" /> Механика</div>
          <div><input type="checkbox" /> Вариатор</div>
          <div><input type="checkbox" /> Робот</div>
          <div><input type="checkbox" /> Гибрид</div>
        </div>

        <div className="filter_seats">
          <label>Количество мест</label>
          <div><input type="checkbox" /> 2</div>
          <div><input type="checkbox" /> 5</div>
          <div><input type="checkbox" /> 8</div>
        </div>

        <div className="filter_millage">
          <label>Пробег, км</label>
          <input type="number" placeholder="От" />
          <input type="number" placeholder="До" />
        </div>

        <div className="filter_fuel">
          <label>Топливо</label>
          <div><input type="checkbox" /> Бензин</div>
          <div><input type="checkbox" /> Дизель</div>
          <div><input type="checkbox" /> Электричество</div>
          <div><input type="checkbox" /> Газ</div>
          <div><input type="checkbox" /> Гибрид</div>
        </div>

        <div className="filter_year">
          <label>Год выпуска</label>
          <input type="number" placeholder="От" />
          <input type="number" placeholder="До" />
        </div>

        <div className="filter_color">
          <label>Цвет</label>
          <div><input type="checkbox" /> Серый</div>
          <div><input type="checkbox" /> Белый</div>
          <div><input type="checkbox" /> Синий</div>
          <div><input type="checkbox" /> Чёрный</div>
          <div><input type="checkbox" /> Жёлтый</div>
        </div>

        <div className="filter_enige">
          <label>Объём двигателя</label>
          <input type="number" placeholder="От" />
          <input type="number" placeholder="До" />
        </div>

        <div className="filter_trunk">
          <label>Объём багажника</label>
          <input type="number" placeholder="От" />
          <input type="number" placeholder="До" />
        </div>

        <div className="filter-group">
          <label>Кузов</label>
          <div><input type="checkbox" /> Седан</div>
          <div><input type="checkbox" /> Хетчбек</div>
          <div><input type="checkbox" /> Кроссовер</div>
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
