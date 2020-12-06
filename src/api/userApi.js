import Api from '../modules/api';

const apiConfig = {
  loadUser: {
    method: 'GET',
    path: '/users/me',
  },
  signin: {
    method: 'POST',
    path: '/signin',
  },
  signup: {
    method: 'POST',
    path: '/signup',
  }
};

const defaultHeaders = {
  'Content-Type': 'application/json',
}

const createUserApi = (headers = defaultHeaders) => new Api('https://praktikum-diploma-api.madg.nu', { ...defaultHeaders, ...headers }, apiConfig);
export default createUserApi;
