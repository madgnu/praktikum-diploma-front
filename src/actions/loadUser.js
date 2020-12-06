const { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } = require("./types");

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

const loadUser = () => {
  return async (dispatch, getState) => {
    try {
      const { userApi } = getState().user;
      dispatch(loadUserRequest());
      const  rData = await userApi.loadUser();
      dispatch(loadUserSuccess(rData));
    } catch (err) {
      dispatch(loadUserError(err));
    }
  }
}

export default loadUser;
