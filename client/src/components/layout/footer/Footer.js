import React from 'react';
import { Link } from 'react-router-dom';

const AppFooter = () => {
  return (
    <React.Fragment>
      <footer className="page-footer  font-small special-color-dark">
        <div className="footer-copyright text-center py-3">
          © 2019 Copyright:
          <Link to="/">
            <span className="ml-2">Utriao</span>
          </Link>
        </div>
      </footer>
    </React.Fragment>
  );
};
export default AppFooter;
