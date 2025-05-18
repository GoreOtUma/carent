import React, { useState } from 'react';
import MyButton from '../components/UI/button/MyButton';
import '../styles/Archive.css';

const ArchiveWorker = () => {
  const [activeTab, setActiveTab] = useState('archived');

  const archivedContracts = [
    {
      brand: 'Totoya Corolla',
      name: 'Иванов Иван Иванович',
      email: 'prok@rent.com',
      date: '11.12.2022 - 21.12.2022',
      insurance: 'Тип страховки',
      price: '5000 руб.',
    },
  ];

  const currentContracts = archivedContracts.map(contract => ({
    ...contract,
    button: 'Закрыть контракт',
  }));

  const contracts = activeTab === 'archived' ? archivedContracts : currentContracts;

  return (
    <div className="archive-worker-page archive-page">
      <h3>Архив. Работник</h3>

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

      <div className="content">
        <div className="filter-panel">
          <label>Дата</label>
          <div>
            <input type="date" placeholder="От" />
            <input type="date" placeholder="До" />
          </div>
          <label>Марка</label>
          <input type="text" placeholder="Введите марку" />
          <MyButton className="filter-button">Фильтровать</MyButton>
          <MyButton className="reset-button">Сбросить фильтр</MyButton>
        </div>

        <div className="contracts">
          {contracts.map((contract, index) => (
            <div className="contract-card" key={index}>
              <div className="card-header">
                <strong>{contract.brand}</strong>
                <span>Id контракта</span>
              </div>
              <div className="card-body">
                <div>{contract.name}</div>
                <div>{contract.email}</div>
                <div>{contract.date}</div>
                <div>{contract.insurance}</div>
              </div>
              <div className="card-footer">
                {contract.button && <MyButton>{contract.button}</MyButton>}
                <span>{contract.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchiveWorker;
