import axios from 'axios';
import setAuthorizationToken from './setAuthorizationToken';
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_DETAIL,
  CLEAR_CURRENT_USER_DETAIL,
  FORGOT_PASSWORD
} from './types';
import jwt from 'jsonwebtoken';
import { setAlert } from './alertAction';
import { clearProfile } from './profileActions';

export const login = userData => async dispatch => {
  try {
    const response = await axios.post('/api/users/login', userData);
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
    dispatch(setAlert('login Successfull', 'success', 3000));
  } catch (error) {
    const { message } = error.response.data;
    if (typeof message === 'string')
      return dispatch(setAlert(message, 'danger'));

    if (typeof message !== 'undefined')
      message.map(message => dispatch(setAlert(message, 'danger', 5000)));
  }
};

export const register = userData => async dispatch => {
  try {
    const response = await axios.post('/api/users/register', userData);
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
    // dispatch(setAlert('Account Created Successfully', 'success', 5000));
    window.location.href = '/setting';
  } catch (error) {
    const { message } = error.response.data;
    if (typeof message === 'string')
      return dispatch(setAlert(message, 'danger'));
    message.map(message => dispatch(setAlert(message, 'danger', 3000)));
  }
};

export const logout = () => async dispatch => {
  try {
    const response = await axios.post('/api/users/logout');
    if (response.data.status === 'Success') {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(setCurrentUser(null));
      dispatch(clearCurrentUserDetail());
      dispatch(clearProfile());

      window.location.href = '/login';
      // dispatch(setAlert(response.data.message, 'success', 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger', 3000));
  }
};

export const logoutAll = () => async dispatch => {
  try {
    const response = await axios.post('/api/users/logoutAll');

    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser(null));
    dispatch(clearCurrentUserDetail());
    dispatch(clearProfile());
    dispatch(setAlert(response.data.message, 'success', 3000));
    window.location.href = '/login';
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
  }
};

export const fetchCurrentUserDetail = () => async dispatch => {
  try {
    const response = await axios.get('/api/users/me');
    dispatch(setCurrentUserDetail(response.data.data.user));
  } catch (error) {
    if (error.response.data.message === 'Please authenticate') {
      localStorage.removeItem('jwtToken');
      window.location.href = '/login';
    }
  }
};

export const setCurrentUserDetail = user => {
  return {
    type: SET_CURRENT_USER_DETAIL,
    payload: user
  };
};

export const clearCurrentUserDetail = () => {
  return {
    type: CLEAR_CURRENT_USER_DETAIL
  };
};

export const setCurrentUser = decodedToken => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  };
};

export const forgotPassword = email => async dispatch => {
  try {
    const response = await axios.post('/api/users/forgotPassword', email);
    dispatch({
      type: FORGOT_PASSWORD,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD,
      payload: error.response.data
    });
  }
};

export const resetPassword = (data, token) => async dispatch => {
  try {
    const response = await axios.put(`/api/users/resetPassword/${token}`, data);
    dispatch(setAlert(response.data.message, 'success'));
    window.location.href = '/login';
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
  }
};
