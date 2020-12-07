import loadFavorites from './loadFavorites';

import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from './types';

const loadUserRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
  }
}

const loadUserSuccess = (userData) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: userData,
  }
}

const loadUserError = (error) => {
  return {
    type: USER_LOGIN_ERROR,
    payload: error,
  }
}

const loadUser = (redirectTo = null, withFav = false) => {
  return async (dispatch, getState) => {
    try {
      const { userApi } = getState().user;
      dispatch(loadUserRequest());
      const  rData = await userApi.loadUser();
      dispatch(loadUserSuccess(rData));
      if (withFav) {
        dispatch(loadFavorites());
      }
    } catch (err) {
      if (redirectTo) {
        location.href = redirectTo;
      }
      dispatch(loadUserError(err));
    }
  }
}

export default loadUser;
