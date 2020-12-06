import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_SIGNIN_SUCCESS
} from '../actions/types';

import userApi from '../api/userApi';

export default function userReducer(state = { userApi: userApi(), loggedIn: false }, action) {
  switch (action.type) {
    case USER_SIGNIN_SUCCESS: return { ...state, userApi: action.payload };
    case USER_LOGIN_REQUEST: return { ...state, loading: true }
    case USER_LOGIN_SUCCESS: return { ...state, loading: false, loggedIn: true, ...action.payload, error: null };
    case USER_LOGIN_ERROR: return { ...state, loading: false, loggedIn: false, error: action.payload };
    case USER_LOGOUT: return { ...state, loggedIn: false, userApi: userApi() };
  }
  return state;
}
