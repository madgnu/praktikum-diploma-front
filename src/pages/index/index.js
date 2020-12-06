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
import userReducer from '../../reducers/user';

import Root from '../../components/root';
import SearchResults from '../../components/search-results';
import Headliner from '../../components/headliner';
import About from '../../components/about';
import signin from '../../actions/signin';

const reducer = flux.combineReducers({
  news: newsReducer,
  user: userReducer,
});

const store = flux.applyMiddleware(flux.createStore(reducer), thunkMiddleware, loggerMiddleware);
store.dispatch(signin('madgnu@madg.nu', 'Str0ngPassword'));

render(parser `
  <${Root} store=${store}>
    <${Headliner} store=${store} />
    <${SearchResults} store=${store} />
    <${About} />
  </${Root}>
`, document.querySelector('.root'));
