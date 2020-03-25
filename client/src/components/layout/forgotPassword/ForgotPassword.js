import React, { useState } from 'react';
import FrontNav from '../frontNav/FrontNav';
import { connect } from 'react-redux';
import { forgotPassword } from '../../../store/actions/authActions';
const ForgotPassword = ({ forgotPassword, response }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [emailInput, setEmailInput] = useState({ email: '' });

  const onChangeHandler = event => {
    setEmailInput({ email: event.target.value });
  };
  const onSubmitHandler = event => {
    event.preventDefault();
    setShowDialog(true);

    forgotPassword(emailInput);
  };

  return (
    <React.Fragment>
      <FrontNav />

      <div style={{ paddingTop: '80px' }} className="form-gap"></div>
      <div className="container text-light">
        <div className="row">
          <div className="col-lg-3"></div>

          {showDialog && (
            <div className="col-lg-6 align-self-center   m-4 p-4  text-white text-center ">
              <p className="lead text-light">{response.message}</p>

              {response.status === 'Success' && (
                <button
                  onClick={() => {
                    forgotPassword(emailInput);
                  }}
                  className="btn btn-dark"
                >
                  Request a new one
                </button>
              )}
              <button
                onClick={() => setShowDialog(false)}
                className="btn btn-danger"
              >
                Enter Email Again
              </button>
            </div>
          )}

          {!showDialog && (
            <div className="col-lg-6 align-self-center   m-4 p-4  text-white text-center ">
              <div className="panel panel-default ml-4">
                <div className="panel-body">
                  <div className="text-center">
                    <h3>
                      <i className="fa fa-lock fa-4x"></i>
                    </h3>
                    <h2 className="text-center ">Forgot Password?</h2>
                    <p>Let's get you a new one.</p>
                    <div className="panel-body">
                      <form onSubmit={onSubmitHandler.bind(this)}>
                        <div className="form-group">
                          <input
                            onChange={onChangeHandler.bind(this)}
                            value={emailInput.email}
                            name="email"
                            placeholder="Email address"
                            className="form-control bg-dark text-light"
                            type="email"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            name="recover-submit"
                            className="btn btn-lg btn-danger btn-block"
                            value="Reset Password"
                            type="submit"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="col-lg-3"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    response: state.auth.forgotPassword
  };
};

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);
