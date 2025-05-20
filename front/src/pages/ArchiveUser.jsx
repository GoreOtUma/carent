import React, { useEffect, useState } from 'react';
import MyButton from '../components/UI/button/MyButton';
import ContractService from '../API/ContractService';
import ModelService from '../API/ModelService';
import { useAuth } from '../context/AuthContext';
import formatDateTime from '../utils/formatDateTime';

const ArchiveUser = () => {
  const { user } = useAuth();
  const [contracts, setContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [models, setModels] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    modelId: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка контрактов
  useEffect(() => {
    if (!user) return;

    async function fetchContracts() {
      setLoading(true);
      setError(null);
      try {
        const data = await ContractService.getById(user.id);
        const clos = data.filter(contracts => contracts.status === "closed");
        setContracts(clos);
        setFilteredContracts(clos); // Начальное состояние — все контракты
      } catch (err) {
        setError('Ошибка при загрузке контрактов');
      } finally {
        setLoading(false);
      }
    }

    fetchContracts();
  }, [user]);

  // Загрузка моделей
  useEffect(() => {
    async function fetchModels() {
      try {
        const data = await ModelService.getAll();
        setModels(data);
      } catch (err) {
        console.error('Ошибка при загрузке моделей', err);
      }
    }

    fetchModels();
  }, []);

  // Обработка изменения фильтров
  const handleFilterChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Фильтрация по кнопке
  const applyFilters = () => {
    const { startDate, endDate, modelId } = filters;

    const filtered = contracts.filter(contract => {
      const contractDate = new Date(contract.start_date);
      const startOk = !startDate || new Date(startDate) <= contractDate;
      const endOk = !endDate || new Date(endDate) >= contractDate;
      const modelOk = !modelId || contract.car.model.id_model === parseInt(modelId);

      return startOk && endOk && modelOk;
    });

    setFilteredContracts(filtered);
  };

  const resetFilters = () => {
    setFilters({ startDate: '', endDate: '', modelId: '' });
    setFilteredContracts(contracts);
  };

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
                <input
                  type="datetime-local"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
              </div>
              <div className="date-input">
                <span>До</span>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h3 className="section-title">Модель автомобиля</h3>
            <select
              className="brand-select"
              name="modelId"
              value={filters.modelId}
              onChange={handleFilterChange}
            >
              <option value="">Все модели</option>
              {models.map(model => (
                <option key={model.id_model} value={model.id_model}>
                  {model.brand.name_brand} {model.name_model}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <MyButton className="filter-button" onClick={applyFilters}>
              Фильтровать
            </MyButton>
          </div>

          <div className="filter-section">
            <MyButton className="filter-button" onClick={resetFilters}>
              Сбросить фильтр
            </MyButton>
          </div>
        </div>

        <section className="contract-list">
          {loading && <p>Загрузка...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && filteredContracts.length === 0 && (
            <p>Контрактов не найдено</p>
          )}
          {!loading && !error &&
            filteredContracts.map((contract) => (
              <div key={contract.id_contr} className="contract-card">
                <div className="contract-card-main">
                  <div className="contract-brand">
                    <strong>
                      {contract.car.model.brand.name_brand} {contract.car.model.name_model}
                    </strong>
                  </div>
                  <div>{formatDateTime(contract.start_date, contract.end_date)}</div>
                  <div>
                    {contract.insurance?.type_ins || 'Без страховки'} <span>страховка</span>
                  </div>
                </div>
                <div className="additional-left">
                  {contract.total_cost || '—'} ₽
                </div>
              </div>
            ))}
        </section>
      </div>
    </div>
  );
};

export default ArchiveUser;
