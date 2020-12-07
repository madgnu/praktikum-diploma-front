import { backendBaseUrl } from '../config';
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
  },
  getFavorites: {
    method: 'GET',
    path: '/articles',
  },
  addFavorite: {
    method: 'POST',
    path: '/articles',
  },
  removeFavorite: {
    method: 'DELETE',
    path: '/articles/:articleId',
  },
};

const defaultHeaders = {
  'Content-Type': 'application/json',
}

const createUserApi = (headers = defaultHeaders) => new Api(backendBaseUrl, { ...defaultHeaders, ...headers }, apiConfig);
export default createUserApi;
