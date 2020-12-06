import createUserApi from "../api/userApi";
import loadUser from "./loadUser";
import { USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_SIGNIN_SUCCESS } from "./types";

const signinRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
  }
};

const signinError = (error) => {
  return {
    type: USER_LOGIN_ERROR,
    payload: error
  }
}

const signinSuccess  = (token) => {
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  localStorage.setItem('jwt', token);

  const userApi = createUserApi(headers);

  return {
    type: USER_SIGNIN_SUCCESS,
    payload: userApi,
  }
}

const signin = (email, password) => {
  return async (dispatch, getState) => {
    try {
      const { userApi } = getState().user;
      dispatch(signinRequest());
      const { token } = await userApi.signin(null, { email, password });
      dispatch(signinSuccess(token));
      dispatch(loadUser());
    } catch (err) {
      dispatch(signinError(err));
    }
  }
}

export default signin;
