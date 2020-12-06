import { USER_LOGOUT } from "./types";

export default function signout() {
  localStorage.removeItem('jwt');
  return {
    type: USER_LOGOUT,
  }
}
