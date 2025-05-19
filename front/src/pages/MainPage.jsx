import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';
import Card from '../components/Card';
import CarService from '../API/CarService';
import CarcaseService from '../API/CarcaseService';
import FuelService from '../API/FuelService';
import TransmissionService from '../API/TransmissionService';
import BrandService from '../API/BrandService';

const MainPage = () => {
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    priceMin: '',
    priceMax: '',
    transmissions: [],
    seats: [],
    mileageMin: '',
    mileageMax: '',
    fuels: [],
    yearMin: '',
    yearMax: '',
    colors: [],
    engineMin: '',
    engineMax: '',
    trunkMin: '',
    trunkMax: '',
    carcasses: [],
    brand: ''
  });

  const [transmissions, setTransmissions] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [carcases, setCarcases] = useState([]);
  const [brands, setBrands] = useState([]);

  // Получаем все машины и справочники один раз
  useEffect(() => {
    const fetchAll = async () => {
      const carsFromServer = await CarService.getAll();
  
      // Отфильтруем только свободные машины
      const freeCars = carsFromServer.filter(car => car.is_rented === "free");
  
      // Нормализуем: добавим поле `id`
      const normalizedCars = freeCars.map(car => ({
        ...car,
        id: car.id_car // <== ключевой момент
      }));
  
      setAllCars(normalizedCars);
      setFilteredCars(normalizedCars);
  
      setTransmissions(await TransmissionService.getAll());
      setFuels(await FuelService.getAll());
      setCarcases(await CarcaseService.getAll());
      setBrands(await BrandService.getAll());
    };
    fetchAll();
  }, []);
  

  // Фильтрация при изменении фильтров
  useEffect(() => {
    const applyFilters = () => {
      let result = allCars;
  
      result = result.filter(car => {
        const {
          transmissions, seats, mileageMin, mileageMax,
          fuels, priceMin, priceMax, yearMin, yearMax,
          colors, engineMin, engineMax, trunkMin, trunkMax,
          carcasses, brand
        } = filters;
  
        const price = car.cost_day;
        if (priceMin && price < priceMin) return false;
        if (priceMax && price > priceMax) return false;
  
        if (transmissions.length && !transmissions.includes(car.transmission.name_trans)) return false;
        if (fuels.length && !fuels.includes(car.fuel.name_fuel)) return false;
        if (carcasses.length && !carcasses.includes(car.carcase.name_carcase)) return false;
        if (colors.length && !colors.includes(car.color)) return false;
        if (seats.length && !seats.includes(car.seating_capacity)) return false;
  
        if (brand && car.model.brand.name_brand !== brand) return false;
  
        if (mileageMin && car.mileage < mileageMin) return false;
        if (mileageMax && car.mileage > mileageMax) return false;
  
        if (yearMin && car.year < yearMin) return false;
        if (yearMax && car.year > yearMax) return false;
  
        if (engineMin && car.engine_volume < engineMin) return false;
        if (engineMax && car.engine_volume > engineMax) return false;
  
        if (trunkMin && car.trunk_volume < trunkMin) return false;
        if (trunkMax && car.trunk_volume > trunkMax) return false;
  
        return true;
      });
  
      setFilteredCars(result);
    };
  
    applyFilters();
  }, [filters, allCars]);

  const handleCheckboxChange = (field, value) => {
    setFilters(prev => {
      const list = prev[field];
      return {
        ...prev,
        [field]: list.includes(value) ? list.filter(v => v !== value) : [...list, value]
      };
    });
  };

  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };


  return (
    <div className="main-page">
      <aside className="filters">
        <div className="filter-section">
          <h3 className="section-title">Даты аренды</h3>
          <div className="date-range">
            <div className="date-input">
              <span>От</span>
              <input type="datetime-local" className="filter-input" value={filters.dateFrom} onChange={(e) => handleInputChange('dateFrom', e.target.value)} />
            </div>
            <div className="date-input">
              <span>До</span>
              <input type="datetime-local" className="filter-input" value={filters.dateTo} onChange={(e) => handleInputChange('dateTo', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="filter-section">
          <h3 className="section-title">Цена, ₽</h3>
          <input type="number" className="filter-input" placeholder="Min" value={filters.priceMin} onChange={(e) => handleInputChange('priceMin', e.target.value)} />
          <input type="number" className="filter-input" placeholder="Max" value={filters.priceMax} onChange={(e) => handleInputChange('priceMax', e.target.value)} />
        </div>

        <div className="filter-section">
          <h3 className="section-title">Трансмиссия</h3>
          {transmissions.map(({ id_trans, name_trans }) => (
            <label key={id_trans} className="checkbox-item">
              <input type="checkbox" onChange={() => handleCheckboxChange('transmissions', name_trans)} />
              <span className="checkmark"></span>{name_trans}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3 className="section-title">Количество мест</h3>
          {[2, 5, 8].map(seats => (
            <label key={seats} className="checkbox-item">
              <input type="checkbox" onChange={() => handleCheckboxChange('seats', seats)} />
              <span className="checkmark"></span>{seats}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3 className="section-title">Пробег, км</h3>
          <input type="number" placeholder="От" value={filters.mileageMin} onChange={(e) => handleInputChange('mileageMin', e.target.value)} />
          <input type="number" placeholder="До" value={filters.mileageMax} onChange={(e) => handleInputChange('mileageMax', e.target.value)} />
        </div>

        <div className="filter-section">
          <h3 className="section-title">Топливо</h3>
          {fuels.map(({ id_fuel, name_fuel }) => (
            <label key={id_fuel} className="checkbox-item">
              <input type="checkbox" onChange={() => handleCheckboxChange('fuels', name_fuel)} />
              <span className="checkmark"></span>{name_fuel}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3 className="section-title">Год выпуска</h3>
          <input type="number" placeholder="От" value={filters.yearMin} onChange={(e) => handleInputChange('yearMin', e.target.value)} />
          <input type="number" placeholder="До" value={filters.yearMax} onChange={(e) => handleInputChange('yearMax', e.target.value)} />
        </div>

        <div className="filter-section">
          <h3 className="section-title">Цвет</h3>
          {["Белый", "Синий", "Черный", "Красный", "Желтый"].map(color => (
            <label key={color} className="checkbox-item">
              <input type="checkbox" onChange={() => handleCheckboxChange('colors', color)} />
              <span className="checkmark"></span>{color}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3 className="section-title">Объём двигателя</h3>
          <input type="number" placeholder="От" value={filters.engineMin} onChange={(e) => handleInputChange('engineMin', e.target.value)} />
          <input type="number" placeholder="До" value={filters.engineMax} onChange={(e) => handleInputChange('engineMax', e.target.value)} />
        </div>

        <div className="filter-section">
          <h3 className="section-title">Объём багажника</h3>
          <input type="number" placeholder="От" value={filters.trunkMin} onChange={(e) => handleInputChange('trunkMin', e.target.value)} />
          <input type="number" placeholder="До" value={filters.trunkMax} onChange={(e) => handleInputChange('trunkMax', e.target.value)} />
        </div>

        <div className="filter-section">
          <h3 className="section-title">Кузов</h3>
          {carcases.map(({ id_carcase, name_carcase }) => (
            <label key={id_carcase} className="checkbox-item">
              <input type="checkbox" onChange={() => handleCheckboxChange('carcasses', name_carcase)} />
              <span className="checkmark"></span>{name_carcase}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3 className="section-title">Марка автомобиля</h3>
          <select className="brand-select" value={filters.brand} onChange={(e) => handleInputChange('brand', e.target.value)}>
            <option value="">Все марки</option>
            {brands.map(({ id_brand, name_brand }) => (
              <option key={id_brand} value={name_brand}>{name_brand}</option>
            ))}
          </select>
        </div>
      </aside>

      <section className="main-page__cards">
        {filteredCars.map(car => <Card key={car.id_car} {...car} />)}
      </section>
    </div>
  );
};

export default MainPage;
