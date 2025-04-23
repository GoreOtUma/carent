import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserNavBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="menu-header__item" onClick={() => navigate('/mainpage')}>
        <div className="menu-header__text">Автопарк</div>
      </div>
      <div className="menu-header__item" onClick={() => navigate('/profile')}>
        <div className="menu-header__text">Профиль</div>
      </div>
      <div className="menu-header__item" onClick={() => navigate('/archive_user')}>
        <div className="menu-header__text">Архив</div>
      </div>
    </>
  );
};

export default UserNavBar;
