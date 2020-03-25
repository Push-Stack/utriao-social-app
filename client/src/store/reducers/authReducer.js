import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_DETAIL,
  CLEAR_CURRENT_USER_DETAIL,
  FORGOT_PASSWORD
} from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  currentUserDetail: null,
  forgotPassword: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        currentUser: action.payload
      };

    case SET_CURRENT_USER_DETAIL:
      return {
        ...state,
        currentUserDetail: action.payload
      };
    case CLEAR_CURRENT_USER_DETAIL:
      return {
        ...state,
        currentUserDetail: null
      };

    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPassword: action.payload
      };
    default:
      return state;
  }
}
