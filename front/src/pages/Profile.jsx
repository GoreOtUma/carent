import React from 'react';
import '../styles/MainPage.css';
import '../styles/Profile.css';
import InfoBlock from '../components/InfoBlock.jsx';
import MyButton from '../components/UI/button/MyButton.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email")
  const login = localStorage.getItem("login")
  
  const { setUser } = useAuth();


  const handleProfile = () => {
    navigate('/profile');
  };
  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    localStorage.removeItem("user_role");
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
    localStorage.removeItem("login");
    setUser(null);
    navigate('/signin');
  };
    return (
      <div className="profile-page">
        <div className='profile-info'>
          <div className='info-blocks'>
            <InfoBlock header= 'Фамилия' body={username || "qwert"}></InfoBlock>
            <InfoBlock header='Имя' body={username || "qwert"}></InfoBlock>
            <InfoBlock header='Отчесство' body={username || "qwert"}></InfoBlock>
            <InfoBlock header= 'Почта' body={email || "User@gmail.com"}></InfoBlock>
            <InfoBlock header='Номер телефона' body='89999999999'></InfoBlock>
            <InfoBlock header='Паспорт' body='22 22 123456'></InfoBlock>
            <InfoBlock header='ВУ' body='22 22 123456'></InfoBlock>
            <div className="to-rent">
                <MyButton className="button-edit" type="button" >Редактировать</MyButton>
            </div>
        </div>
        <div className="contract-block">
            <h2>Действующий контракт</h2>
            <p><strong>Название машины:</strong> Toyota Camry</p>
            <p><strong>Гос. номер:</strong> А123ВС77</p>
            <p><strong>Дата начала:</strong> 2025-04-01</p>
            <p><strong>Дата окончания:</strong> 2025-05-01</p>
            <p><strong>Стоимость:</strong> 50 000 ₽</p>
        </div>
    </div>
</div>
);
};
export default Profile;
