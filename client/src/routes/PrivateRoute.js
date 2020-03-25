import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,

  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
export default connect(mapStateToProps, null)(PrivateRoute);
