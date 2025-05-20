import React, { useEffect, useState } from 'react';
import MyButton from '../components/UI/button/MyButton';
import ContractService from '../API/ContractService';
import BrandService from '../API/BrandService';
import '../styles/Archive.css';
import formatDateTime from '../utils/formatDateTime'; 

const ArchiveWorker = () => {
  const [activeTab, setActiveTab] = useState('archived');
  const [contracts, setContracts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState(null);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contractData, brandData] = await Promise.all([
          ContractService.getAll(),
          BrandService.getAll()
        ]);
        setContracts(contractData);
        setBrands(brandData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
    fetchData();
  }, []);

  const getDisplayContracts = () => {
    const base = filteredContracts ?? contracts;
    return base.filter(c => {
      if (activeTab === 'archived') {
        return c.status?.toLowerCase() === 'closed';
      } else {
        const status = c.status?.toLowerCase();
        return status === 'created' || status === 'approved';
      }
      
    });
  };
  const handleApprove = async (contract) => {
    try {
      await ContractService.updateStatus(contract.id_contr, {
        status: 'approved',
        change_type: 'approve'
      });
      refreshContracts();
    } catch (e) {
      console.error('Ошибка при подтверждении аренды:', e);
    }
  };
  
  
  const handleClose = async (contract) => {
    try {
      await ContractService.updateStatus(contract.id_contr, {
        status: 'closed',
        change_type: 'close'
      });
      
      refreshContracts();
    } catch (e) {
      console.error('Ошибка при закрытии аренды:', e);
    }
  };
  
  
  const refreshContracts = async () => {
    try {
      const contractData = await ContractService.getAll();
      setContracts(contractData);
    } catch (e) {
      console.error('Ошибка при обновлении контрактов:', e);
    }
  };
  

  const handleFilter = () => {
    const filtered = contracts.filter(contract => {
      const contractStart = new Date(contract.start_date);
      const contractEnd = new Date(contract.end_date);

      const matchesStart = startDate ? new Date(startDate) <= contractEnd : true;
      const matchesEnd = endDate ? new Date(endDate) >= contractStart : true;
      const matchesBrand = selectedBrand
        ? contract.car?.model?.brand?.name_brand.toLowerCase().includes(selectedBrand.toLowerCase())
        : true;

      return matchesStart && matchesEnd && matchesBrand;
    });

    setFilteredContracts(filtered);
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setSelectedBrand('');
    setFilteredContracts(null);
  };

  const displayContracts = getDisplayContracts();

  return (
    <div className="archive-worker-page archive-page">
      <div className="archive-page-main">
        <div className="filters">
          <div className="top-menu">
            <button className={activeTab === 'archived' ? 'active' : ''} onClick={() => { setActiveTab('archived'); setFilteredContracts(null); }}>
              Завершённые контракты
            </button>
            <button className={activeTab === 'current' ? 'active' : ''} onClick={() => { setActiveTab('current'); setFilteredContracts(null); }}>
              Текущие контракты
            </button>
          </div>

          <div className="filter-section">
            <h3 className="section-title">Дата:</h3>
            <div className="date-range">
              <div className="date-input">
                <span>От</span>
                <input type="datetime-local" className="filter-input" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
              <div className="date-input">
                <span>До</span>
                <input type="datetime-local" className="filter-input" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h3 className="section-title">Марка автомобиля</h3>
            <select className="brand-select" value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
              <option value="">Все марки</option>
              {brands.map((brand) => (
                <option key={brand.id_brand} value={brand.name_brand.toLowerCase()}>
                  {brand.name_brand}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <MyButton className="filter-button" onClick={handleFilter}>Фильтровать</MyButton>
          </div>
          <div className="filter-section">
            <MyButton className="filter-button" onClick={handleReset}>Сбросить фильтр</MyButton>
          </div>
        </div>

        <div className="contract-list">
          {displayContracts.map((contract) => (
            <div className="contract-card" key={contract.id_contr}>
              <div className="contract-card-main">
                <div className="contract-brand">
                  <strong>{contract.car.model.brand.name_brand} {contract.car.model.name_model}</strong>
                </div>
                <div>
                  {contract.user.l_name} {contract.user.name} {contract.user.f_name}
                </div>
                <div>{contract.user.email}</div>
                <div>{formatDateTime(contract.start_date, contract.end_date)}</div>
                <div>{contract.insurance.type_ins}</div>
              </div>
              <div className="additional-left additional-left-many">
                <div>{contract.id_contr}</div>
                <div>{contract.total_cost} ₽</div>
                {activeTab === 'current' && contract.status?.toLowerCase() === 'approved' ? (
                <MyButton className="close-button" onClick={() => handleClose(contract)}>Закрыть аренду</MyButton>
                ) : (<MyButton className="fixion-button" />)}
                {activeTab === 'current' && contract.status?.toLowerCase() === 'created' ? (
                <MyButton className="close-button" onClick={() => handleApprove(contract)}>Подтвердить аренду</MyButton>
                ) : (<MyButton className="fixion-button" />)}
                {activeTab === 'current' && contract.status?.toLowerCase() === 'created'? (
                  <MyButton className="close-button">Отклонить аренду</MyButton>
                ) : (
                  <MyButton className="fixion-button" />
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
