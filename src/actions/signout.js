import { USER_LOGOUT } from "./types";

export default function signout(redirectTo = false) {
  localStorage.removeItem('jwt');
  if (redirectTo) location.href = redirectTo;
  return {
    type: USER_LOGOUT,
  }
}
