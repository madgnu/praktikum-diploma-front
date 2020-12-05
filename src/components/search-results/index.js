import './search-results.css';
import './__list/search-results__list.css';
import './__action-more/search-results__action-more.css';
import './__loading-icon/search-results__loading-icon.css';
import './__not-found-icon/search-results__not-found-icon.css';
import './__message/search-results__message.css';
import './__title/search-results__title.css';
import './__subtitle/search-results__subtitle.css';

import Component from '../../modules/component';
import parser from '../../modules/parser';

import CardList from '../card-list';

export default class SearchResults extends Component {
  render() {
    return parser `
      <section class="root__section root__section_theme_gray container search-results">
        <h2 class="search-results__title title title_size_m">Результаты поиска</h2>
        <${CardList} />
        <button class="search-results__action-more button button_style_secondary">Показать еще</button>
      </section>
    `;
  }
}
