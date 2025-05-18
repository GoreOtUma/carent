import React from 'react';
import '../styles/MainPage.css';
import '../styles/InfoBlock.css';

const Profile = ({ header, body }) => {
    return (
        <div className="info-block">
            <div className="info__header">
              <span>{header}</span>
            </div>
            <div className="info__body">
              <span>{body}</span>
            </div>
        </div>
    );
  };

export default Profile;
