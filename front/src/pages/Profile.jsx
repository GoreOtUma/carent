import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';
import '../styles/Profile.css';
import InfoBlock from '../components/InfoBlock.jsx';
import MyButton from '../components/UI/button/MyButton.jsx';
import UserService from '../API/UserService';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const user = await UserService.getById(id);
          setUserData(user);
        }
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
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
          <p><strong>Название машины:</strong> Toyota Camry</p>
          <p><strong>Гос. номер:</strong> А123ВС77</p>
          <p><strong>Дата начала:</strong> 2025-04-01 15:00</p>
          <p><strong>Дата окончания:</strong> 2025-05-01 15:00</p>
          <p><strong>Стоимость:</strong> 50 000 ₽</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
