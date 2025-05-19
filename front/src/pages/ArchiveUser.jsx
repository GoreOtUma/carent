import React from 'react';
import MyButton from '../components/UI/button/MyButton';

const ArchiveUser = () => {
  // Здесь позже можно будет подключить фильтры и загрузку данных с сервера
  const contracts = [
    { brand: 'Toyota Carina', price: '5000', period: '12.12.2005 15:00 — 05.01.2006 15:00', insurance: 'Базовая' },
  ];

  return (
    <div className="archive-page">
      <h1>Архив моих контрактов</h1>
      <div className="archive-page-main">
      <div className="filters">
        <div className="filter-section">
          <h3 className="section-title">Дата:</h3>
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
          <h3 className="section-title">Модель автомобиля</h3>
          <select className="brand-select">
            <option value="">Все модели</option>
            {['Toyota Carina', 'Honda Civic', 'BMW M5', 'Audi Q7', 'Volkswagen Polo', 'Kia K5', 'Ford Focus'].map((brand) => (
              <option key={brand} value={brand.toLowerCase()}>{brand}</option>
            ))}
          </select>
        </div>
        <div className="filter-section">
          <MyButton className="filter-button">Фильтровать</MyButton>
        </div>
        <div className="filter-section">
          <MyButton className="filter-button">Сбросить фильтр</MyButton>
        </div>
      </div>

      <section className="contract-list">
        {contracts.map((contract, index) => (
          <div key={index} className="contract-card">
            <div className="contract-card-main">
              <div className="contract-brand"><strong>{contract.brand}</strong></div>
              <div>{contract.period}</div>
              <div>{contract.insurance}<span> страховка</span></div>
            </div>
            <div className="additional-left">{contract.price} ₽</div>
          </div>
        ))}
      </section>
      </div>
    </div>
  );
};

export default ArchiveUser;
