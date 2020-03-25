import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({
  component: Component,
  isAuthenticated,
  user,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Redirect to={`/`} /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.currentUser
  };
};
export default connect(mapStateToProps, null)(PublicRoute);
