import React, { useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import './ChangePassword.css';
import { changePassword } from '../../../../store/actions/profileActions';
import { removeAlerts } from '../../../../store/actions/alertAction';
import { connect } from 'react-redux';
const ChangePassword = ({ changePassword, removeAlerts }) => {
  const changePasswordButton = useRef();

  const [passwordData, setPasswordData] = useState({
    password: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const fade = useSpring({
    from: {
      opacity: 0
    },
    opacity: 1,
    config: {
      duration: 500
    }
  });

  const onChangeHandler = e => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };
  const onSubmitHandler = e => {
    changePasswordButton.current.disabled = true;
    removeAlerts();
    e.preventDefault();

    changePassword(passwordData);
    changePasswordButton.current.disabled = false;
  };

  return (
    <React.Fragment>
      <animated.div style={fade}>
        <h6 className="font-weight-bold">Change Password</h6>
        <hr />

        <form onSubmit={onSubmitHandler} id="changePasswordForm">
          <div className="row">
            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group label-floating">
                <label className="control-label deep-orange-text ">
                  Confirm Current Password
                </label>
                <input
                  name="password"
                  value={passwordData.password}
                  onChange={onChangeHandler}
                  type="password"
                  className="form-control special-color text-white"
                />
              </div>
            </div>
            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group label-floating">
                <label className="control-label deep-orange-text ">
                  Your New Password
                </label>
                <input
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={onChangeHandler}
                  type="password"
                  className="form-control special-color text-white"
                />
              </div>
            </div>
            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group label-floating">
                <label className="control-label deep-orange-text ">
                  Confirm New Password
                </label>
                <input
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={onChangeHandler}
                  type="password"
                  className="form-control special-color text-white"
                />
              </div>
            </div>

            <div className="mt-4 text-center form-group col col-lg-12 col-sm-12 col-sm-12 col-12">
              <button
                ref={changePasswordButton}
                type="submit"
                className="form-control btn default-color-dark text-light p-2   "
              >
                Change Password Now!
              </button>
            </div>
          </div>
        </form>
      </animated.div>
    </React.Fragment>
  );
};

export default connect(null, { changePassword, removeAlerts })(ChangePassword);
