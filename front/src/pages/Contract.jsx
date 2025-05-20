import React, { useEffect, useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Contract.css';
import MyButton from '../components/UI/button/MyButton';
import { useAuth } from "../context/AuthContext";
import InsuranceService from '../API/InsuranceService';
import ContractService from '../API/ContractService';

const Contract = () => {
  const { state } = useLocation();
  const carData = state?.carData;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [insurances, setInsurances] = useState([]);
  const [selectedInsuranceId, setSelectedInsuranceId] = useState('');
  const [insuranceCost, setInsuranceCost] = useState(0);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [carPricePerDay, setCarPricePerDay] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

const handleRent = async () => {
  try {
    if (!startDate || !endDate) {
      setDateError('Заполните даты аренды');
      return;
    }

    const payload = {
      id_user: user.id,
      id_car: carData.id,
      start_date: new Date(startDate).toISOString(),
      end_date: new Date(endDate).toISOString(),
      total_cost: totalPrice,
      id_ins: parseInt(selectedInsuranceId),
      status: "created"
    };
    console.log('Отправляем контракт:', payload);

    await ContractService.create(payload);

    navigate('/profile'); // например, список контрактов или подтверждение
  } catch (error) {
    if (error.response) {
      setDateError(error.response.data.detail || 'Ошибка при создании контракта');
    } else {
      setDateError('Ошибка сети или сервера');
    }
  }
};

  // Новое состояние для ошибки дат
  const [dateError, setDateError] = useState('');

  // Загружаем страховки и устанавливаем первую выбранной
  useEffect(() => {
    const fetchInsurances = async () => {
      try {
        const data = await InsuranceService.getAll();
        const validInsurances = data.filter(i => i?.id_ins !== undefined && i?.cost !== undefined);
        setInsurances(validInsurances);

        if (validInsurances.length > 0) {
          setSelectedInsuranceId(validInsurances[0].id_ins.toString());
          setInsuranceCost(validInsurances[0].cost);
        }
      } catch (error) {
        console.error('Ошибка при загрузке страховок:', error);
      }
    };

    fetchInsurances();
  }, []);

  // Устанавливаем цену авто за день при загрузке carData
  useEffect(() => {
    if (carData?.cost_day) {
      setCarPricePerDay(carData.cost_day);
    } else {
      setCarPricePerDay(0);
    }
  }, [carData]);

  // Обновляем стоимость страховки при смене выбранной
  useEffect(() => {
    if (!selectedInsuranceId) return;

    const insurance = insurances.find(i => i.id_ins.toString() === selectedInsuranceId);
    if (insurance) {
      setInsuranceCost(insurance.cost);
    }
  }, [selectedInsuranceId, insurances]);

  // Пересчитываем итоговую стоимость при изменении дат, цены авто или страховки + валидация дат
  useEffect(() => {
    setDateError('');

    if (!startDate || !endDate) {
      setTotalPrice(0);
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      setDateError('Неверный формат даты');
      setTotalPrice(0);
      return;
    }

    if (end <= start) {
      setDateError('Дата окончания должна быть позже даты начала');
      setTotalPrice(0);
      return;
    }

    const diffMs = end - start;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24)); // считаем дни аренды

    const price = (carPricePerDay * diffDays) + insuranceCost;
    setTotalPrice(price);
  }, [startDate, endDate, carPricePerDay, insuranceCost]);

  if (!carData) {
    navigate('/mainpage');
    return null;
  }

  // Блокируем кнопку аренды если ошибка по датам или даты не заполнены
  const isRentButtonDisabled = !!dateError || !startDate || !endDate;

  return (
    <div className="contract-page">
      <div className="contract-container">
        <div className="contract-image-side">
          <img 
            src={carData.image_path} 
            alt={`${carData.model.brand.name_brand} ${carData.model.name_model}`}
            className="car-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
            }}
          />
        </div>

        <div className="contract-details-side">
          <h2 className="car-title">{carData.model.brand.name_brand + ' ' + carData.model.name_model}</h2>
          <div className="car-detail-list">
            <p><b>Гос. номер:</b> {carData.gos_number || '00000000'}</p>
            <p><b>Трансмиссия:</b> {carData.transmission.name_trans}</p>
            <p><b>Топливо:</b> {carData.fuel.name_fuel}</p>
            <p><b>Объём багажника:</b> {carData.trunk_volume}</p>
            <p><b>Объём двигателя:</b> {carData.engine_volume}</p>
            <p><b>Количество мест:</b> {carData.seating_capacity}</p>
            <p><b>Пробег:</b> {carData.mileage} км</p>
            <p><b>Год выпуска:</b> {carData.year}</p>
            <p><b>Цвет:</b> {carData.color}</p>
            <p><b>Кузов:</b> {carData.carcase.name_carcase}</p>
            <p><b>Описание:</b> {carData.description}</p>
          </div>

          <div className="form-section">
            <div className="date-range">
              <div className="date-input">
                <span>От</span>
                <input 
                  type="datetime-local" 
                  className="filter-input" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)} 
                />
              </div>
              <div className="date-input">
                <span>До</span>
                <input 
                  type="datetime-local" 
                  className="filter-input" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)} 
                />
              </div>
            </div>

            {/* Вывод ошибки валидации дат */}
            {dateError && <p style={{color: 'red', marginTop: '5px'}}>{dateError}</p>}

            <div className="filter-section">
              <h3 className="section-title">Тип страховки</h3>
              <select 
                className="brand-select" 
                value={selectedInsuranceId} 
                onChange={(e) => setSelectedInsuranceId(e.target.value)}
              >
                {insurances.map(insurance => (
                  <option key={insurance.id_ins} value={insurance.id_ins.toString()}>
                    {insurance.type_ins}
                  </option>
                ))}
              </select>
            </div>

            <div className="price">
              <strong>Стоимость:</strong>
              <span> {totalPrice > 0 ? totalPrice : (carPricePerDay + insuranceCost)} ₽</span>
            </div>

            {user?.role === "user" ? (
              <MyButton
              className="auth button-registration"
              type="button"
              disabled={isRentButtonDisabled}
              onClick={handleRent}
            >
              Арендовать
            </MyButton>
            ) : (
              <MyButton 
                className="auth button-registration" 
                type="button"
                onClick={() => navigate('/signin')} 
              >
                Войдите для аренды
              </MyButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contract;
