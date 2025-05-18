import React from 'react';
import MainLogo from '../../MainLogo.jsx';
import './MyNavBar.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";
import WorkerNavBar from "./WorkerNavBar";
import UserNavBar from "./UserNavBar";

const GuestNavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="menu">
      <div className="menu-pages">
        <div className="menu-header__item" onClick={() => navigate('/mainpage')}>
          <div className="menu-header__text">Автопарк</div>
        </div>
      </div>
      <div className="menu-enter">
        <div className="menu-header__item" onClick={() => navigate('/signup')}>
          <div className="menu-header__text">Регистрация</div>
        </div>
        <span>/</span>
        <div className="menu-header__item" onClick={() => navigate('/signin')}>
          <div className="menu-header__text">Вход</div>
        </div>
      </div>
    </div>
  );
};

export const NavBar = () => {
  const { user } = useAuth();

  return (
    <div className="menu-header">
      <MainLogo className="menu-header__item menu__logo"/>

      {!user ? (
        <GuestNavBar />
      ) : user.role === "worker" ? (
        <WorkerNavBar />
      ) : user.role === "user" ? (
        <UserNavBar />
      ) : null}
    </div>
  );
};

export default NavBar;
