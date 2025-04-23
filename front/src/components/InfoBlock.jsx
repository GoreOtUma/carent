import React from 'react';
import '../styles/MainPage.css';
import '../styles/InfoBlock.css';

const Profile = ({ header, body }) => {
    return (
        <div className="info-block">
            <div className="info__header">
                {header}
            </div>
            <div className="info__body">
              <p>{body}</p>
            </div>
        </div>
    );
  };

export default Profile;
