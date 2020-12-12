import '../../components/input';

import render from '../../modules/render';
import parser from '../../modules/parser';

import Root from '../../components/root';
import SearchResults from '../../components/search-results';
import Headliner from '../../components/headliner';
import About from '../../components/about';

import initializeStore from '../common';

const store = initializeStore();

render(parser `
  <Provider.store value=${store}>
    <${Root} pageName="Главная" overhangHeader=${true}>
      <${Headliner} />
      <${SearchResults} />
      <${About} />
    </${Root}>
  </Provider.store>
`, document.querySelector('body'));
