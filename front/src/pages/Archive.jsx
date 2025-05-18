import React, { useState } from 'react';
import MyButton from '../components/UI/button/MyButton';
import '../styles/Archive.css';

const ArchiveWorker = () => {
  const [activeTab, setActiveTab] = useState('archived');

  const archivedContracts = [
    { id : 3, brand: 'Toyota Carina', name: 'Иванов Иван Иванович', email: 'prok@rent.com', price: '5000', period: '12.12.2005 15:00 — 05.01.2006 15:00', insurance: 'Базовая' },
    { id : 5, brand: 'Toyota Carina', name: 'Иванов Иван Иванович', email: 'prok@rent.com', price: '5000', period: '12.12.2006 15:00 — 05.01.2007 15:00', insurance: 'Базовая' },
    { id : 7, brand: 'Toyota Carina', name: 'Иванов Иван Иванович', email: 'prok@rent.com', price: '5000', period: '12.12.2007 15:00 — 05.01.2008 15:00', insurance: 'Базовая' },
  ];

  const currentContracts = archivedContracts.map(contract => ({
    ...contract,
    button: 'Закрыть контракт',
  }));

  const contracts = activeTab === 'archived' ? archivedContracts : currentContracts;

  return (
    <div className="archive-worker-page archive-page">
      <div className="archive-page-main">
      <div className="filters">

      <div className="top-menu">
        <button
          className={activeTab === 'archived' ? 'active' : ''}
          onClick={() => setActiveTab('archived')}
        >
          Завершённые контракты
        </button>
        <button
          className={activeTab === 'current' ? 'active' : ''}
          onClick={() => setActiveTab('current')}
        >
          Текущие контракты
        </button>
      </div>
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
          <h3 className="section-title">Марка автомобиля</h3>
          <select className="brand-select">
            <option value="">Все марки</option>
            {['Toyota', 'Honda', 'BMW', 'Audi', 'Volkswagen', 'Kia', 'Ford'].map((brand) => (
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


        <div className="contract-list">
          {contracts.map((contract, index) => (
            <div className="contract-card" key={index}>
            <div className="contract-card-main">
                <div className="contract-brand"><strong>{contract.brand}</strong></div>
                <div>{contract.name}</div>
                <div>{contract.email}</div>
                <div>{contract.period}</div>
                <div>{contract.insurance}</div>
            </div>
            <div className="additional-left additional-left-many">
              <div>{contract.id}</div>
              <div>{contract.price} ₽</div>
              {activeTab === 'current' ? (
                  <MyButton className="close-button">Закрыть аренду</MyButton>
                ) : (
                  <MyButton className="fixion-button"></MyButton>
                )}
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchiveWorker;
