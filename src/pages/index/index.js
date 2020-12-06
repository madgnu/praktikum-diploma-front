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
  <${Root} store=${store} pageName="Главная" overhangHeader=${true}>
    <${Headliner} store=${store} />
    <${SearchResults} store=${store} />
    <${About} />
  </${Root}>
`, document.querySelector('body'));
