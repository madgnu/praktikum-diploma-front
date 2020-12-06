import './card-list.css';

import Component from '../../modules/component';
import parser from '../../modules/parser';

import Card from '../card';

export default class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: 0,
    }
  }

  render() {
    const state = this.props.store.getState();
    const cards = state.news.cards.map((el) => parser `<${Card} data=${el} store=${this.props.store}/>`);
    return parser `
      <div class="search-results__list card-list">
        ${cards}
      </div>
    `;
  }

  mapStoreToState = () => {
    const store = this.props.store.getState();
    this.setState({
      cards: store.news.cards,
    })
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
