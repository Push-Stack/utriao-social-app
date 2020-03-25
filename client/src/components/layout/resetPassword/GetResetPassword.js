import React from 'react';
import Loading from '../loading/Loading';

import { Redirect } from 'react-router-dom';

const GetResetPassword = ({ match }) => {
  if (match.params.token) {
    return <Redirect to={`/resetPassword/${match.params.token}`} />;
  }
  return <Loading />;
};
export default GetResetPassword;
