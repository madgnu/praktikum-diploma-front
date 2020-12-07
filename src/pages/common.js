import '../components/body';
import '../components/root';
import '../components/header';
import '../components/footer';
import '../components/container';
import '../components/title';
import '../components/card-list';
import '../components/card';
import '../components/nav';
import '../components/button';
import '../components/search-results';

import * as flux from '../modules/store';
import loggerMiddleware from '../middlewares/logger';
import thunkMiddleware from '../middlewares/thunk';

import newsReducer from '../reducers/news';
import userReducer from '../reducers/user';

import modalReducer from '../reducers/modals';
import { signinSuccess } from '../actions/signin';
import loadUser from '../actions/loadUser';

export default function initializeStore(redirectTo, loadFav = false) {
  const reducer = flux.combineReducers({
    news: newsReducer,
    user: userReducer,
    modal: modalReducer,
  });

  const store = flux.applyMiddleware(flux.createStore(reducer), thunkMiddleware, loggerMiddleware);
  const authToken = localStorage.getItem('jwt');
  if (authToken) {
    store.dispatch(signinSuccess(authToken));
    store.dispatch(loadUser(redirectTo, loadFav));
  } else if (redirectTo) {
    location.href = redirectTo;
  }

  return store;
}
