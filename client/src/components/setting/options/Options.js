import React from 'react';
import './Options.css';

const Options = ({ changeComponent, activeComponent }) => {
  return (
    <React.Fragment>
      <div className="card  border-0">
        <div className="card-header bg-dark text-light  font-weight-bold mb-2  ">
          <i className="fa fa-user mx-2"></i> Profile Setting
        </div>
        <ul className="list-group   list-group-flush settingOptions ">
          <li
            onClick={() => changeComponent('personal')}
            className={`list-group-item  border-0 mx-2 ${activeComponent.personal &&
              'elegant-color text-light'}`}
          >
            Personal Information
          </li>
          <li
            onClick={() => changeComponent('hobbies')}
            className={`list-group-item  border-0 mx-2 ${activeComponent.hobbies &&
              'elegant-color text-light'}`}
          >
            Hobbies and Interests
          </li>
          <li
            onClick={() => changeComponent('education')}
            className={`list-group-item  border-0 mx-2 ${activeComponent.education &&
              'elegant-color text-light'}`}
          >
            Education and Employment
          </li>
          <li
            onClick={() => changeComponent('password')}
            className={`list-group-item  border-0 mx-2 ${activeComponent.password &&
              'elegant-color text-light'}`}
          >
            Change Password
          </li>
          <li
            onClick={() => changeComponent('email')}
            className={`list-group-item  border-0 mx-2   ${activeComponent.email &&
              'elegant-color text-light'}`}
          >
            Change Email
          </li>

          <li
            onClick={() => changeComponent('deleteAccount')}
            className={`list-group-item font-weight-bold border-bottom border-light d-flex align-items-center text-info overflow-auto  ${activeComponent.deleteAccount &&
              'elegant-color text-light'}`}
          >
            <i className="fa fa-random mx-2"></i> Delete Account
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Options;
