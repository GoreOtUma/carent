import React from 'react';
import '../styles/Layout.css';
import MyNavBar from './UI/navBar/MyNavBar'

export const Layout = ({children}) => {
  return (
    <div className="main-wrapper">
      <div className="content">
        <MyNavBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;