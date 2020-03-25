import React from 'react';
import { Link } from 'react-router-dom';
import './FrontNav.css';

const Nav = () => {
  const path = window.location.pathname;

  return (
    <div className="container my-4 ">
      <nav className="navbar navbar-expand navbar-dark  bg-muted">
        <Link className="navbar-brand" to="/login">
          <h3 className="border-right border-danger px-2 ">UTRIAO</h3>
        </Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item ">
            <Link
              className={`nav-link ${
                path === '/login' ? 'active border-bottom border-danger' : null
              }`}
              to="/login"
            >
              Login
            </Link>
          </li>
          <li className="nav-item ">
            <Link
              className={`nav-link ${
                path === '/register'
                  ? 'active border-bottom border-danger'
                  : null
              }`}
              to="/register"
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
