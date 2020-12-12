import './overview.css';
import './__title/overview__title.css';
import './__subtitle/overview__subtitle.css';
import './__text/overview__text.css';
import './__keyword/overview__keyword.css';

import Component from '../../modules/component';
import parser from '../../modules/parser';

export default class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Пользователь',
      cardsCount: 0,
      keywords: [],
    }
  }

  renderKeywords() {
    const { keywords } = this.state;
    if (keywords && keywords.length) {
      const keywordsMarkup = keywords.map((el) => this.parser `<span class="overview__keyword">${` ${el} `}</span>`);
      return this.parser `
        <p class="overview__text">
          По ключевым словам:<span>${keywordsMarkup}</span>
        </p>
      `;
    }
    return null;
  }

  render() {
    const title = `${this.state.name || 'Пользователь'}, у вас ${this.state.cardsCount || 'нет'} сохранённых статей`;

    return this.parser `
      <section class="root__section container container_slim overview">
        <h3 class="overview__subtitle">Сохранённые статьи</h3>
        <h2 class="overview__title title title_size_m">${title}</h2>
        ${this.renderKeywords()}
      </section>
    `;
  }

  calculateKeywords(cards) {
    const keywords = cards.reduce((acc, el) => {
      const { keyword } =  el.data;
      if  (!(keyword in acc)) acc[keyword] = 0;
      acc[keyword] += 1;
      return acc;
    }, {});

    const sortedKeywords = Object.entries(keywords);
    sortedKeywords.sort((a, b) => {
      if (a[1] < b[1]) return 1;
      if (a[1] > b[1]) return -1;
      return 0;
    });

    const reducedKeywords = sortedKeywords.reduce((acc, el,  i, arr) => {
      if (i < 2) {
        acc[i] = el[0];
      } else {
        acc[2] = `и еще ${arr.length-2}`;
      }

      return acc;
    }, []);

    return reducedKeywords;
  }

  mapStoreToState = () => {
    const store = this.props.store.getState();
    const { cards } = store.news;

    const keywords = this.calculateKeywords(cards);

    this.setState({
      name: store.user.name,
      cardsCount: store.news.cards.length,
      keywords,
    });
  }

  componentDidMount() {
    const store = this.props.store;
    this.unsubStore = store.subscribe(this.mapStoreToState);
  }

  componentWillUnmount() {
    this.unsubStore();
  }
}
