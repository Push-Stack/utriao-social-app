import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Routes from './routes/routes';
import setAuthorizationToken from './store/actions/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from './store/actions/authActions';

import './App.css';

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
