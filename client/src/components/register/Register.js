import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import './Register.css';
import FrontFooter from '../layout/frontFooter/FrontFooter';
import FrontNav from '../layout/frontNav/FrontNav';
import { register } from '../../store/actions/authActions';
import { removeAlerts } from '../../store/actions/alertAction';

import Alert from '../layout/alert/Alert';

const Register = ({ register, removeAlerts }) => {
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
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const onChangeHandle = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandle = e => {
    removeAlerts();
    e.preventDefault();

    register(user);
  };
  return (
    <div className="register overflow-auto">
      <div className="primary-overlay">
        <FrontNav />
        <div className="container registerContainer">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6 align-self-center m-4 p-4 text-white text-center">
              <animated.div style={fade}>
                <Alert />
              </animated.div>
              <h3 className="text-success text-monospace my-2 py-4 ">
                Register
              </h3>
              <form onSubmit={e => onSubmitHandle(e)}>
                <div className="form-group ">
                  <input
                    className="form-control pl-4 bg-transparent   text-success"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={user.username}
                    onChange={e => onChangeHandle(e)}
                  />
                </div>

                <div className="form-group">
                  <input
                    className="form-control pl-4 bg-transparent   text-success"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={e => onChangeHandle(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control pl-4 bg-transparent   text-success"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={e => onChangeHandle(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control pl-4 bg-transparent   text-success"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={user.confirmPassword}
                    onChange={e => onChangeHandle(e)}
                  />
                </div>
                <input
                  className="btn btn-danger btn-block text-white"
                  type="submit"
                  value="Join Now"
                />
              </form>
              <div className="loginSuggestion">
                <p className="lead my-4 ">
                  Already have an account ?
                  <span>
                    <Link to="/login" className="text-success px-2">
                      Login
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <FrontFooter />
      </div>
    </div>
  );
};

export default connect(null, {
  register,
  removeAlerts
})(Register);
