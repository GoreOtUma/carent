import React from 'react';
import MyButton from '../components/UI/button/MyButton';

const ArchiveUser = () => {
  // Здесь позже можно будет подключить фильтры и загрузку данных с сервера
  const contracts = [
    { brand: 'Toyota', price: '5000 руб.', period: '12.12.2005 - 05.01.2006' },
    { brand: 'Toyota', price: '5000 руб.', period: '12.12.2005 - 05.01.2006' },
    { brand: 'Toyota', price: '5000 руб.', period: '12.12.2005 - 05.01.2006' },
    { brand: 'Toyota', price: '5000 руб.', period: '12.12.2005 - 05.01.2006' },
    { brand: 'Toyota', price: '5000 руб.', period: '12.12.2005 - 05.01.2006' },
    { brand: 'Toyota', price: '5000 руб.', period: '12.12.2005 - 05.01.2006' },
  ];

  return (
    <div className="archive-page">
      <h1>Архив моих контрактов</h1>
      <div className="filter-block">
        <label>Дата:</label>
        <span>От</span>
        <input type="date" />
        <span>До</span>
        <input type="date" />
        <label htmlFor="Model">Модель:</label>
        <select id="model" name="model">
            <option value="apple">Яблоко</option>
            <option value="banana">Банан</option>
            <option value="orange">Апельсин</option>
        </select>
        <MyButton className="filter-button">Фильтровать</MyButton>
        <MyButton className="reset-button">Сбросить фильтр</MyButton>
      </div>

      <div className="contract-list">
        {contracts.map((contract, index) => (
          <div key={index} className="contract-card">
            <div><strong>{contract.brand}</strong></div>
            <div>{contract.price}</div>
            <div>{contract.period}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchiveUser;
