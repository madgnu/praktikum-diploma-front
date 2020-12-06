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

import search from '../../actions/search';

import CardList from '../card-list';

import iconNotFound from './__not-found-icon/not-found.svg';
export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searched: false,
      hasCards: false,
      hasError: false,
      allLoaded: false,
    }
  }

  onClickLoadMore = ()  => {
    this.props.store.dispatch(search());
  }

  partNotFound() {
    if (this.state.searched && !this.state.loading && !this.state.hasCards && !this.state.hasError) {
      return parser `
        <>
          <img class="search-results__not-found-icon" src=${iconNotFound} alt="Грустный смайлик, сообщающий о том, что ничего не найдено" />
          <h2 class="search-results__subtitle title title_size_s">Ничего не найдено</h2>
          <p class="search-results__message">К сожалению по вашему запросу ничего не найдено.</p>
        </>
      `;
    }
    return null;
  }

  partHasError() {
    if (this.state.hasError) {
      return parser `
        <>
          <img class="search-results__not-found-icon" src=${iconNotFound} alt="Грустный смайлик, сообщающий о том, что все сломалось" />
          <h2 class="search-results__subtitle title title_size_s">Произошла ошибка</h2>
          <p class="search-results__message">К сожалению при выполнении запроса произошла ошибка.</p>
        </>
      `;
    }
    return null;
  }

  partLoading() {
    if (this.state.loading) {
      return parser `
        <>
          <div class="search-results__loading-icon"></div>
          <h3 class="search-results__message">Идет поиск новостей...</h3>
        </>
      `;
    }
    return null;
  }

  showMore() {
    const { loading, allLoaded } = this.state;
    if (!loading && !allLoaded) {
      return parser `<button class="search-results__action-more button button_style_secondary" onClick=${this.onClickLoadMore}>Показать еще</button>`;
    }
    return null;
  }

  partCards() {
    if (this.state.hasCards) {
      return parser `
        <>
          <h2 class="search-results__title title title_size_m">Результаты поиска</h2>
          <${CardList} store=${this.props.store} />
          ${this.showMore()}
        </>
      `;
    }
    return null;
  }

  render() {
    return parser `
      <section class="root__section root__section_theme_gray container search-results">
        ${this.partCards()}
        ${this.partLoading()}
        ${this.partNotFound()}
        ${this.partHasError()}
      </section>
    `;
  }

  mapStoreToState = () => {
    const store = this.props.store.getState();
    this.setState({
      loading: store.news.loading,
      hasCards: store.news.cards.length > 0,
      searched: Boolean(store.news.lastQuery),
      hasError: Boolean(store.news.searchError),
      allLoaded: store.news.cards.length >= store.news.total,
    });
  }

  shouldComponentUpdate(nextState) {
    return this.state.loading !== nextState.loading || this.state.hasCards !== nextState.hasCards;
  }

  componentDidMount() {
    const store = this.props.store;
    this.unsubStore = store.subscribe(this.mapStoreToState);
  }

  componentWillUnmount() {
    this.unsubStore();
  }
}
