import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const ManagerNavBar = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/signin');
  };
  
  return (
    <div className="menu">
      <div className="menu-pages">
        {/* <div className="menu-header__item" onClick={() => navigate('/mainpage')}>
          <div className="menu-header__text">Управление автопарком</div>
        </div> */}
        <div className="menu-header__item" onClick={() => navigate('/mainpageworker')}>
          <div className="menu-header__text">Автопарк</div>
        </div>
        <div className="menu-header__item" onClick={() => navigate('/archive')}>
          <div className="menu-header__text">Архив</div>
        </div>
        {/* <div className="menu-header__item" onClick={() => navigate('/statistic')}>
          <div className="menu-header__text">Статистика</div>
        </div>
        <div className="menu-header__item" onClick={() => navigate('/registration')}>
          <div className="menu-header__text">Регистрация клиента</div>
        </div> */}
      </div>
      <div className="menu-enter">
        <div className="menu-header__item" onClick={handleLogout}>
          <div className="menu-header__text">Выход</div>
        </div>
      </div>
    </div>
  );
};

export default ManagerNavBar;
