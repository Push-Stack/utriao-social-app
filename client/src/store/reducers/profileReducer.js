import {
  LOAD_PROFILE,
  CLEAR_PROFILE,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOAD_POSTS,
  SEARCH_USERS,
  SEARCH_MODAL_SHOW,
  SEARCH_MODAL_HIDE
} from '../actions/types';

const initialState = {
  user: {},
  posts: [],
  searchResult: {},
  searchModalShow: true,
  errors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROFILE:
      return {
        ...state,
        user: action.payload
      };

    case LOAD_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case CLEAR_PROFILE:
      return {
        user: {},
        posts: [],
        errors: null
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null
      };

    case SEARCH_USERS:
      return {
        ...state,
        searchResult: action.payload
      };

    case SEARCH_MODAL_SHOW:
      return {
        ...state,
        searchModalShow: true
      };
    case SEARCH_MODAL_HIDE:
      return {
        ...state,
        searchModalShow: false,
        searchResult: {}
      };
    default:
      return state;
  }
}
