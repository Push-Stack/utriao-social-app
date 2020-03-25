import React from 'react';
import './Cover.css';

const SettingCover = () => {
  return (
    <React.Fragment>
      <section id="settingCover" className="text-center">
        <div className="settingCoverContent">
          <div className="row text-light my-2 ">
            <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-2 col-sm-10 offset-sm-2">
              <h2 className="text-monospace ">Your Account Dashboard</h2>
            </div>
          </div>
          <div className="row text-light">
            <div className=" col-lg-6 offset-lg-3 col-md-10 offset-md-2 col-sm-10 offset-sm-2">
              <p className="bold">
                Welcome to your account dashboard! Here you’ll find everything
                you need to change your profile information settings ,change
                your password and much more!
              </p>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SettingCover;
