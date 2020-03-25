import React from 'react';
import { Link } from 'react-router-dom';
import './FrontFooter.css';
const footer = () => {
  return (
    <div className="row">
      <div className="col fixed-bottom bg-muted   text-center">
        <p className="lead text-white my-3">
          Copyright&copy; 2019 Storm Inc. All Rights Reserved
          <span className=" d-none d-md-inline d-lg-inline text-danger float-right footerBrand">
            <Link to="/login" className="nav-link text-danger ">
              UTRIAO
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default footer;
