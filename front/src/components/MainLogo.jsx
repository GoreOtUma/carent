import React from 'react';
import {  useNavigate } from 'react-router-dom';
import imageCaRent from '../assets/carent-logo.jpeg';
import '../styles/MainLogo.css';

export const MainLogo = ({className = "", ...props}) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (!localStorage.getItem("auth")) {
      navigate('/signin');
    }
    else {
      navigate('/mainpage');
    }
  };
  return (
    <div className={`headline-carent ${className}`} onClick={handleRedirect}>
      <img className="menu-header__image carent-logo" alt="CaRent" src={imageCaRent} />
      <div className="menu-header__text carent-text">CaRent</div>
    </div> 
  );
};

export default MainLogo;
