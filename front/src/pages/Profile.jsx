import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';
import '../styles/Profile.css';
import InfoBlock from '../components/InfoBlock.jsx';
import MyButton from '../components/UI/button/MyButton.jsx';
import UserService from '../API/UserService';
import ContractService from '../API/ContractService';
import formatDateTime from '../utils/formatDateTime.js';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [activeContract, setActiveContract] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?.id;



  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const [user, allContracts] = await Promise.all([
            UserService.getById(id),
            ContractService.getAll()
          ]);
  
          setUserData(user);
  
          const approvedContract = allContracts.find(
            (contract) => contract.user.id === id && contract.status === 'approved'
          );
  
          setActiveContract(approvedContract || null);
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchData();
  }, [id]);
  

  return (
    <div className="profile-page">
      <div className='profile-info'>
        <div className='info-blocks'>
          <InfoBlock header='Фамилия' body={userData?.f_name} />
          <InfoBlock header='Имя' body={userData?.name} />
          <InfoBlock header='Отчество' body={userData?.l_name} />
          <InfoBlock header='Почта' body={userData?.email} />
          <InfoBlock header='Номер телефона' body={userData?.telephone} />
          <InfoBlock header='Номер паспорта' body={userData?.s_passport} />
          <InfoBlock header='Серия паспорта' body={userData?.n_passport} />
          <InfoBlock header='ВУ' body={userData?.n_vu} />

          <div className="to-rent">
            <MyButton className="button-edit auth primary-button" type="button">
              Редактировать
            </MyButton>
          </div>
        </div>

        <div className="contract-block">
          <h2>Действующий контракт</h2>
          {activeContract ? (
            <>
              <p><strong>Название машины:</strong> {activeContract.car.model.brand.name_brand} {activeContract.car.model.name_model}</p>
              <p><strong>Гос. номер:</strong> {activeContract.car.gov_number}</p>
              <p><strong>Дата начала:</strong> {formatDateTime(activeContract.start_date)}</p>
              <p><strong>Дата окончания:</strong> {formatDateTime(activeContract.end_date)}</p>
              <p><strong>Стоимость:</strong> {activeContract.total_cost} ₽</p>
            </>
          ) : (
            <p>Нет активных контрактов</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
