import openModal from "./openModal";
import { USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_ERROR } from "./types";

const signupRequest = () => {
  return {
    type: USER_SIGNUP_REQUEST,
  }
};

const signupError = (error) => {
  return {
    type: USER_SIGNUP_ERROR,
    payload: error
  }
}

export const signupSuccess = () => {
  return {
    type: USER_SIGNUP_SUCCESS,
  }
}

export const signup = ({ email, password, name }) => {
  return async (dispatch, getState) => {
    try {
      const { userApi } = getState().user;
      dispatch(signupRequest());
      await userApi.signup(null, { email, password, name });
      dispatch(signupSuccess());
      dispatch(openModal('registerSuccess'));
    } catch (err) {
      dispatch(signupError(err));
    }
  }
}

export default signup;
