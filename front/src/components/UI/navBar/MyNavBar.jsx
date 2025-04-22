import React from 'react';
import MainLogo from '../../MainLogo.jsx';
import './MyNavBar.css';
import { useNavigate, useLocation } from 'react-router-dom';
/*import WavingHandGrey from '../../../assets/waving-hand-grey.png';
import WavingHandBlue from '../../../assets/waving-hand-blue.png';
import MapPinGrey from '../../../assets/map-pin-grey.png';
import MapPinBlue from '../../../assets/map-pin-blue.png';
import HomeGrey from '../../../assets/home-grey.png';
import HomeBlue from '../../../assets/home-blue.png';
import NetworkSwitchGrey from '../../../assets/network-switch-grey.png';
import NetworkSwitchBlue from '../../../assets/network-switch-blue.png';
import NoteGrey from '../../../assets/note-grey.png';
import NoteBlue from '../../../assets/note-blue.png';
*/
export const NavBar = ({children}) => {

    const navigate = useNavigate();
    const location = useLocation();
  
    const isActive = (path) => location.pathname === path;
    
    return (
    <div className="menu-header">
        <MainLogo className="menu-header__item menu__logo"/>
    </div>
  );
};

export default NavBar;