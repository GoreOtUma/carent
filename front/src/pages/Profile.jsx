import React from 'react';
import '../styles/MainPage.css';
import '../styles/Profile.css';
import InfoBlock from '../components/InfoBlock.jsx';
import MyButton from '../components/UI/button/MyButton.jsx';

const Profile = () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email")

    return (
      <div className="profile-page">
        <div className='profile-info'>
          <div className='info-blocks'>
            <InfoBlock header= 'Фамилия' body={username || "Иванов"}></InfoBlock>
            <InfoBlock header='Имя' body={username || "Иван"}></InfoBlock>
            <InfoBlock header='Отчество' body={username || "Иванович"}></InfoBlock>
            <InfoBlock header= 'Почта' body={email || "User@gmail.com"}></InfoBlock>
            <InfoBlock header='Номер телефона' body='89999999999'></InfoBlock>
            <InfoBlock header='Номер паспорта' body='22 22'></InfoBlock>
            <InfoBlock header='Серия паспорта' body='222222'></InfoBlock>
            <InfoBlock header='ВУ' body='22 22 123456'></InfoBlock>
            <div className="to-rent">
              <MyButton className="button-edit auth primary-button" type="button" >Редактировать</MyButton>
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
