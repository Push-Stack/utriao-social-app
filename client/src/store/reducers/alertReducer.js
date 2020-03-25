import { SET_ALERT, CLEAR_ALERT, REMOVE_ALERTS } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];

    case CLEAR_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    case REMOVE_ALERTS:
      return initialState;
    default:
      return state;
  }
}
