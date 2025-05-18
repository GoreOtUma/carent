import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const UserNavBar = () => {
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
        <div className="menu-header__item" onClick={() => navigate('/mainpage')}>
          <div className="menu-header__text">Автопарк</div>
        </div>
        <div className="menu-header__item" onClick={() => navigate('/profile')}>
          <div className="menu-header__text">Профиль</div>
        </div>
        <div className="menu-header__item" onClick={() => navigate('/archive_user')}>
          <div className="menu-header__text">Архив</div>
        </div>
      </div>
      <div className="menu-enter">
        <div className="menu-header__item" onClick={handleLogout}>
          <div className="menu-header__text">Выход</div>
        </div>
      </div>
    </div>
  );
};

export default UserNavBar;
