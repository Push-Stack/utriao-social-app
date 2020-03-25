import axios from 'axios';
import { setAlert } from './alertAction';
import {
  fetchCurrentUserDetail,
  setCurrentUser,
  clearCurrentUserDetail
} from './authActions';

import {
  LOAD_PROFILE,
  CLEAR_PROFILE,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOAD_POSTS,
  SEARCH_USERS,
  SEARCH_MODAL_SHOW,
  SEARCH_MODAL_HIDE
} from './types';

import setAuthorizationToken from './setAuthorizationToken';

export const fetchProfile = id => async dispatch => {
  try {
    const response = await axios.get(`/api/users/profile/${id}`);

    dispatch(loadProfile(response.data.user));
  } catch (error) {
    dispatch(setErrors(error.response.data.message));
  }
};

export const loadProfile = user => {
  return {
    type: LOAD_PROFILE,
    payload: user
  };
};

export const clearProfile = () => {
  return {
    type: CLEAR_PROFILE
  };
};

export const setErrors = errors => {
  return {
    type: SET_ERRORS,
    payload: errors
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const uploadCover = coverData => async (dispatch, getState) => {
  try {
    await axios.post('/api/users/cover', coverData);
    const { auth } = getState();

    window.location.href = `/profile/${auth.currentUser.id}`;
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger', 7000));
  }
};

export const uploadAvatar = avatarData => async (dispatch, getState) => {
  try {
    await axios.post('/api/users/avatar', avatarData);
    const { auth } = getState();

    window.location.href = `/profile/${auth.currentUser.id}`;
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger', 7000));
  }
};

export const updatePersonal = userData => async (dispatch, getState) => {
  try {
    const response = await axios.put('/api/users/personal', userData);

    dispatch(setAlert(response.data.message, 'success'));

    dispatch(fetchCurrentUserDetail());
  } catch (error) {
    const { message } = error.response.data;
    if (typeof message === 'string')
      return dispatch(setAlert(message, 'danger'));
    message.map(message => dispatch(setAlert(message, 'danger')));
  }

  const auth = getState().auth;
  dispatch(fetchProfile(auth.currentUser.id));
};

export const updateHobbies = HobbiesData => async (dispatch, getState) => {
  try {
    const response = await axios.put('/api/users/hobbies', HobbiesData);

    dispatch(setAlert(response.data.message, 'success'));
  } catch (error) {
    const { message } = error.response.data;
    if (typeof message === 'string')
      return dispatch(setAlert(message, 'danger'));
    message.map(message => dispatch(setAlert(message, 'danger')));
  }

  const auth = getState().auth;
  dispatch(fetchProfile(auth.currentUser.id));
};

export const changePassword = passwordData => async dispatch => {
  try {
    const response = await axios.put('/api/users/password', passwordData);
    dispatch(setAlert(response.data.message, 'success'));

    setTimeout(() => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(setCurrentUser(null));
      dispatch(clearCurrentUserDetail());
      dispatch(clearProfile());
      dispatch(setAlert('Successfully logged out from App', 'success'));
      window.location.href = '/login';
    }, 4000);
  } catch (error) {
    const { message } = error.response.data;
    if (typeof message === 'string')
      return dispatch(setAlert(message, 'danger'));
    message.map(message => dispatch(setAlert(message, 'danger')));
  }
};

export const changeEmail = emailData => async dispatch => {
  try {
    const response = await axios.put('/api/users/email', emailData);
    dispatch(setAlert(response.data.message, 'success'));
    dispatch(fetchCurrentUserDetail());
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
  }
};

export const deleteUser = deleteData => async dispatch => {
  try {
    const response = await axios.delete('/api/users/delete', {
      data: deleteData
    });
    dispatch(setAlert(response.data.message, 'success'));

    setTimeout(() => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(setCurrentUser(null));
      dispatch(clearCurrentUserDetail());
      dispatch(clearProfile());

      // window.location.href = '/login';
      dispatch(setAlert('Sorry to see you go :(', 'success'));
    }, 5000);
  } catch (error) {
    const { message } = error.response.data;
    if (typeof message === 'string')
      return dispatch(setAlert(message, 'danger'));
    message.map(message => dispatch(setAlert(message, 'danger')));
  }
};

export const addEducation = education => async (dispatch, getState) => {
  try {
    const response = await axios.post('/api/users/education', education);

    dispatch(setAlert(response.data.message, 'success'));
  } catch (error) {
    const { message } = error.response.data;
    if (typeof message === 'string')
      return dispatch(setAlert(message, 'danger'));
    message.map(message => dispatch(setAlert(message, 'danger')));
  }

  const auth = getState().auth;

  dispatch(fetchProfile(auth.currentUser.id));
};
export const updateEducation = (education, id) => async (
  dispatch,
  getState
) => {
  try {
    const response = await axios.put(`/api/users/education/${id}`, education);

    dispatch(setAlert(response.data.message, 'success'));
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
  }

  const auth = getState().auth;
  dispatch(fetchProfile(auth.currentUser.id));
};
export const deleteEducation = id => async (dispatch, getState) => {
  try {
    const response = await axios.delete(`/api/users/education/${id}`);

    dispatch(setAlert(response.data.message, 'success'));
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
  }

  const auth = getState().auth;
  dispatch(fetchProfile(auth.currentUser.id));
};

export const followUser = id => async (dispatch, getState) => {
  try {
    const response = await axios.put(`/api/users/${id}/follow`);

    dispatch(setAlert(response.data.message, 'success'));
  } catch (error) {
    dispatch(setErrors(error.response.data.message));
    dispatch(setAlert(error.response.data.message, 'danger'));
  }

  dispatch(fetchProfile(id));
};

export const unfollowUser = id => async (dispatch, getState) => {
  try {
    const response = await axios.put(`/api/users/${id}/unfollow`);

    dispatch(setAlert(response.data.message, 'success'));
  } catch (error) {
    dispatch(setErrors(error.response.data.message));
    dispatch(setAlert(error.response.data.message, 'danger'));
  }

  dispatch(fetchProfile(id));
};

export const getAllPosts = id => async dispatch => {
  try {
    const response = await axios.get(`/api/users/posts/author/${id}`);

    dispatch(loadPosts(response.data.posts));
  } catch (error) {
    dispatch(setErrors(error.response.data.message));
  }
};

export const loadPosts = posts => {
  return {
    type: LOAD_POSTS,
    payload: posts
  };
};

export const createPost = post => async (dispatch, getState) => {
  try {
    const response = await axios.post('/api/users/posts', post);
    dispatch(setAlert(response.data.message, 'success'));
  } catch (error) {
    dispatch(setErrors(error.response.data.message));
    dispatch(setAlert(error.response.data.message, 'danger', 6000));
  }
  const auth = getState().auth;
  dispatch(getAllPosts(auth.currentUser.id));
};

export const likePost = id => async (dispatch, getState) => {
  try {
    await axios.put(`/api/users/posts/${id}/like`);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger', 3000));
  }

  const profile = getState().profile;
  dispatch(getAllPosts(profile.user._id));
};

export const unlikePost = id => async (dispatch, getState) => {
  try {
    await axios.put(`/api/users/posts/${id}/unlike`);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger', 3000));
  }

  const profile = getState().profile;
  dispatch(getAllPosts(profile.user._id));
};

export const addComment = (postId, commentData) => async (
  dispatch,
  getState
) => {
  try {
    await axios.post(`/api/users/posts/${postId}/comment`, commentData);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger', 3000));
  }
  const profile = getState().profile;
  dispatch(getAllPosts(profile.user._id));
};

export const deleteComment = (postId, commentId) => async (
  dispatch,
  getState
) => {
  try {
    await axios.post(`/api/users/posts/${postId}/comment/${commentId}`);
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger', 3000));
  }
  const profile = getState().profile;
  dispatch(getAllPosts(profile.user._id));
};

export const searchUsers = searchInput => async dispatch => {
  try {
    const result = await axios.post('/api/users/search', searchInput);

    dispatch({
      type: SEARCH_USERS,
      payload: { users: result.data.users, count: result.data.count }
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger', 3000));
  }
};

export const setSearchModalShow = () => {
  return {
    type: SEARCH_MODAL_SHOW
  };
};

export const setSearchModalHide = () => {
  return {
    type: SEARCH_MODAL_HIDE
  };
};

export const editPost = (post, id) => async (dispatch, getState) => {
  try {
    await axios.put(`/api/users/posts/${id}`, post);
  } catch (error) {
    dispatch(setErrors(error.response.data.message));
    dispatch(setAlert(error.response.data.message, 'danger', 6000));
  }
  const auth = getState().auth;
  dispatch(getAllPosts(auth.currentUser.id));
};

export const deletePost = id => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/users/posts/${id}`);
  } catch (error) {
    dispatch(setErrors(error.response.data.message));
    dispatch(setAlert(error.response.data.message, 'danger', 6000));
  }
  const auth = getState().auth;
  dispatch(getAllPosts(auth.currentUser.id));
};

export const editComment = (
  postId,
  commentId,
  comment,
  postAuthorId
) => async dispatch => {
  try {
    await axios.put(`/api/users/posts/${postId}/comment/${commentId}`, comment);
  } catch (error) {
    dispatch(setErrors(error.response.data.message));
    dispatch(setAlert(error.response.data.message, 'danger', 6000));
  }

  dispatch(getAllPosts(postAuthorId));
};

export const removeComment = (
  postId,
  commentId,
  postAuthorId
) => async dispatch => {
  try {
    await axios.delete(`/api/users/posts/${postId}/comment/${commentId}`);
  } catch (error) {
    dispatch(setErrors(error.response.data.message));
    dispatch(setAlert(error.response.data.message, 'danger', 6000));
  }

  dispatch(getAllPosts(postAuthorId));
};
