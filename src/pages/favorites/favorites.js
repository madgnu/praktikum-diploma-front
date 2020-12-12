import render from '../../modules/render';
import parser from '../../modules/parser';

import Root from '../../components/root';
import Overview from '../../components/overview';
import SearchResults from '../../components/search-results';


import initializeStore from '../common';


const store = initializeStore('./', true);

render(parser `
  <Provider.store value=${store}>
    <${Root} pageName="Сохраненные статьи" overhangHeader=${false} redirectOnSignout="./">
      <${Overview} />
      <${SearchResults} deleteUnfaved=${true} />
    </${Root}>
  </Provider.store>
`, document.querySelector('body'));
