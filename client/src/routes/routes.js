import React, { useContext } from 'react';
import { useTransition, animated } from 'react-spring';
import { Switch, __RouterContext, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import './routes.css';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import ForgotPassword from '../components/layout/forgotPassword/ForgotPassword';
import ResetPassword from '../components/layout/resetPassword/ResetPassword';
import Profile from '../components/profile/Profile';
import Setting from '../components/setting/Setting';
import GetResetPassword from '../components/layout/resetPassword/GetResetPassword';

const Routes = () => {
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, location => location.pathname, {
    initial: { transform: 'translate3d(0, 0%,0)' },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });
  return transitions.map(({ item, props, key }) => (
    <animated.div
      style={{ ...props, position: 'absolute', height: '100%', width: '100%' }}
      key={key}
    >
      <Switch location={item}>
        <PrivateRoute exact path="/" component={Setting} />

        <PrivateRoute exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/setting" component={Setting} />

        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />

        <PublicRoute exact path="/forgotpassword" component={ForgotPassword} />

        <PublicRoute
          exact
          path="/users/resetPassword/:token"
          component={GetResetPassword}
        />
        <PublicRoute
          exact
          path="/resetPassword/:token"
          component={ResetPassword}
        />

        <Redirect to={`/setting`} />
      </Switch>
    </animated.div>
  ));
};

export default Routes;
