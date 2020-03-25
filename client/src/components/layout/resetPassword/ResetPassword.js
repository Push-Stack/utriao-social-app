import React, { useState } from 'react';
import FrontNav from '../frontNav/FrontNav';
import { connect } from 'react-redux';
import { resetPassword } from '../../../store/actions/authActions';
import AppAlert from '../alert/appAlerts/AppAlerts';
const ResetPassword = ({ resetPassword, match }) => {
  const [resetData, setResetData] = useState({
    password: '',
    confirmPassword: ''
  });

  const onChangeHandler = event => {
    setResetData({ ...resetData, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    resetPassword(resetData, match.params.token);
    setResetData({
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <React.Fragment>
      <FrontNav />

      <AppAlert />

      <div style={{ paddingTop: '80px' }} className="form-gap"></div>
      <div className="container text-light">
        <div className="row">
          <div className="col-lg-3"></div>

          <div className="col-lg-6 align-self-center   m-4 p-4  text-white text-center ">
            <div className="panel panel-default ml-4">
              <div className="panel-body">
                <div className="text-center">
                  <h3>
                    <i className="fa fa-lock fa-4x"></i>
                  </h3>
                  <h2 className="text-center ">New Password</h2>
                  <p>Change your password now.</p>
                  <div className="panel-body">
                    <form onSubmit={onSubmitHandler.bind(this)}>
                      <div className="form-group">
                        <input
                          value={resetData.password}
                          onChange={onChangeHandler.bind(this)}
                          name="password"
                          placeholder="password"
                          className="form-control"
                          type="password"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          value={resetData.confirmPassword}
                          onChange={onChangeHandler.bind(this)}
                          name="confirmPassword"
                          placeholder="confirm"
                          className="form-control"
                          type="password"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="recover-submit"
                          className="btn btn-lg btn-success btn-block"
                          value="Change"
                          type="submit"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(null, { resetPassword })(ResetPassword);
