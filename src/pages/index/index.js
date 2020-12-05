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

import { FETCH_NEWS_REQUEST, FETCH_NEWS_SUCCESS } from '../../actions/types';

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

function reducer(state, action) {
  switch (action.type) {
    case FETCH_NEWS_REQUEST: {
      const { query: lastQuery, freshStart } = action.payload;
      const cards = freshStart ? [] : state.cards;

      return { ...state, loading: true, cards, lastQuery };
    }
    case FETCH_NEWS_SUCCESS: return { ...state, loading: false, cards: [...state.cards, ...action.payload] };
  }
  return state;
}

const initialState = {
  newsApi,
  cards: [],
}

const store = flux.applyMiddleware(flux.createStore(reducer, initialState), thunkMiddleware, loggerMiddleware);

render(parser `
  <${Root} store=${store}>
    <${Headliner} store=${store} />
    <${SearchResults} store=${store} />
    <${About} />
  </${Root}>
`, document.querySelector('.root'));
