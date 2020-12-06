import render from '../../modules/render';
import parser from '../../modules/parser';

import Root from '../../components/root';
import Overview from '../../components/overview';
import SearchResults from '../../components/search-results';


import initializeStore from '../common';


const store = initializeStore('./', true);

render(parser `
  <${Root} store=${store} pageName="Сохраненные статьи" overhangHeader=${false} redirectOnSignout="./">
    <${Overview} store=${store} />
    <${SearchResults} store=${store} deleteUnfaved=${true} />
  </${Root}>
`, document.querySelector('body'));
