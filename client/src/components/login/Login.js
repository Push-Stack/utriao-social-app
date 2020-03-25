import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import { removeAlerts } from '../../store/actions/alertAction';
import FrontFooter from '../layout/frontFooter/FrontFooter';
import FrontNav from '../layout/frontNav/FrontNav';

import { login } from '../../store/actions/authActions';
import Alert from '../layout/alert/Alert';

import './Login.css';

const Login = ({ login, removeAlerts }) => {
  useEffect(() => {
    return () => {
      removeAlerts();
    };
  }, [removeAlerts]);

  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 2000
    }
  });

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onChangeHandle = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandle = async e => {
    removeAlerts();
    e.preventDefault();
    login(user);
  };

  return (
    <div className="login overflow-auto">
      <div className="primary-overlay">
        <FrontNav />
        <div className="container">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6 align-self-center   m-4 p-4  text-white text-center ">
              <animated.div style={fade}>
                <Alert />
              </animated.div>

              <h3 className="text-success text-monospace my-2 py-2">
                Account Info
              </h3>
              <img
                src="/images/icon-user.png"
                height="120"
                width="120"
                alt="User"
                className="img-fluid  rounded-circle loginImage"
              />

              <form onSubmit={e => onSubmitHandle(e)}>
                <div className="form-group row my-4  rounded">
                  <label htmlFor="email" className="col-3 col-form-label">
                    Email
                  </label>
                  <div className="col-9 ">
                    <input
                      id="email"
                      type="email"
                      className="form-control-plaintext  text-success  mx-4  px-4    "
                      placeholder=" phoenix@mail.com"
                      name="email"
                      value={user.email}
                      onChange={e => onChangeHandle(e)}
                    />
                  </div>
                </div>
                <div className="form-group row my-4  rounded">
                  <label htmlFor="password" className="col-3 col-form-label">
                    Password
                  </label>
                  <div className="col-9 ">
                    <input
                      id="password"
                      type="password"
                      className="form-control-plaintext  text-success  mx-4  px-4    "
                      placeholder="*******"
                      value={user.password}
                      onChange={e => onChangeHandle(e)}
                      name="password"
                    />
                  </div>
                </div>
                <button
                  className="btn btn-danger mt-4 btn-block text-white "
                  type="submit"
                >
                  Login
                </button>
              </form>

              <div className="registerSuggestions">
                <p className="lead my-4">
                  Don't have an account ?
                  <span>
                    <Link to="/register" className="text-success px-2">
                      SignUp
                    </Link>
                  </span>
                </p>
              </div>
              <div className="forgotPassword">
                <Link to="/forgotpassword" className="text-danger px-2">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FrontFooter />
    </div>
  );
};
export default connect(null, {
  login,
  removeAlerts
})(Login);
