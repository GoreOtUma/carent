import React from 'react';
import { useNavigate } from 'react-router-dom';

const ManagerNavBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="menu-header__item" onClick={() => navigate('/mainpage')}>
        <div className="menu-header__text">Управление автопарком</div>
      </div>
      <div className="menu-header__item" onClick={() => navigate('/archive')}>
        <div className="menu-header__text">Архив</div>
      </div>
      <div className="menu-header__item" onClick={() => navigate('/statistic')}>
        <div className="menu-header__text">Статистика</div>
      </div>
      <div className="menu-header__item" onClick={() => navigate('/registration')}>
        <div className="menu-header__text">Регистрация клиента</div>
      </div>
    </>
  );
};

export default ManagerNavBar;
