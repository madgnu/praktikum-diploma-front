import './card-list.css';

import Component from '../../modules/component';

import Card from '../card';

export default class CardList extends Component {
  constructor(props) {
    super(props);
    const { cards = [], keyMode = 'numbers' } = this.props.store.getState().news;
    this.state = { keyMode, cards };
  }

  render() {
    const { keyMode, cards } = this.state;
    const cardsMarkup = cards.map((el, i) => this.parser `<${Card} deleteUnfaved=${this.props.deleteUnfaved} key=${(keyMode === 'numbers') ? i : el._id} />`);
    return this.parser `
      <div class="search-results__list card-list">
        ${cardsMarkup}
      </div>
    `;
  }

  mapStoreToState = () => {
    const store = this.props.store.getState();
    const { keyMode, cards } = store.news;
    this.setState({ keyMode, cards });
  }

  shouldComponentUpdate(nextState) {
    return this.state.cards.length !== nextState.cards.length;
  }

  componentDidMount() {
    const store = this.props.store;
    this.unsubStore = store.subscribe(this.mapStoreToState);
  }

  componentWillUnmount() {
    this.unsubStore();
  }
}
