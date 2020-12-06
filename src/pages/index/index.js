import '../../components/headliner';
import '../../components/about';
import '../../components/input';
import '../../components/modal';
import '../../components/form';

import render from '../../modules/render';
import parser from '../../modules/parser';

import * as flux from '../../modules/store';
import loggerMiddleware from '../../middlewares/logger';
import thunkMiddleware from '../../middlewares/thunk';

import newsReducer from '../../reducers/news';

import Api from '../../modules/api';

import Root from '../../components/root';
import SearchResults from '../../components/search-results';
import Headliner from '../../components/headliner';
import About from '../../components/about';

const newsApi = new Api('http://newsapi.org/v2', { 'Authorization' : 'ea576070b4ad4780b5492b54195ee10b' }, {
  search: {
    method: 'GET',
    path: '/everything'
  }
});

const initialState = {
  newsApi,
  cards: [],
}

const reducer = flux.combineReducers({
  news: newsReducer,
});

const store = flux.applyMiddleware(flux.createStore(reducer, initialState), thunkMiddleware, loggerMiddleware);

render(parser `
  <${Root} store=${store}>
    <${Headliner} store=${store} />
    <${SearchResults} store=${store} />
    <${About} />
  </${Root}>
`, document.querySelector('.root'));
