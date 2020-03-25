import { combineReducers } from 'redux';
import authReducers from './authReducer';
import profileReducer from './profileReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  auth: authReducers,
  profile: profileReducer,
  alerts: alertReducer
});
