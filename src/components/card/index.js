import './card.css';
import './__body/card__body.css';
import './__image/card__image.css';
import './__date/card__date.css';
import './__description/card__description.css';
import './__source/card__source.css';
import './__header/card__header.css';
import './__toolbar/card__toolbar.css';
import './__title/card__title.css';
import './__main-info/card__main-info.css';

import Component from '../../modules/component';
import parser from '../../modules/parser';

import formatDate from '../../helpers/formatDate';

import openModal from '../../actions/openModal';
import { addFavorite, deleteFavorite } from '../../actions/favorites';

export default class Card extends Component {
  constructor(props) {
    super(props);
    const store = this.props.store.getState();
    this.state = {
      loggedIn: store.user.loggedIn,
      data: store.news.cards[this.props.key].data,
    }
  }

  renderHint() {
    if (!this.state.loggedIn) {
      return parser `<button className="button button_style_sub-tooltip">Войдите, чтобы сохранять статьи</button>`;
    }
    return null;
  }

  onClickFavorite = (event) => {
    event.preventDefault();
    if (!this.state.loggedIn) {
      return this.props.store.dispatch(openModal('login'));
    }
    if (this.state._id) {
      return this.props.store.dispatch(deleteFavorite(this.props.key));;
    }
    this.props.store.dispatch(addFavorite(this.props.key));
  }

  render() {
    const data = this.state.data;
    const bookedClass =  this.state._id ? 'button_icon_booked' : '';
    return parser `
      <div className="card">
        <div className="card__header">
          <div className="card__toolbar">
            <button className=${`button button_style_tooltip button_icon_bookmark ${bookedClass}`} onClick=${this.onClickFavorite}  disabled=${this.state.loading}></button>
            ${this.renderHint()}
          </div>
        </div>
        <img className="card__image" src=${data.image} alt="Превью статьи" />
        <div className="card__body">
          <div className="card__main-info">
            <span className="card__date">${formatDate(data.date)}</span>
            <h3 className="card__title title title_size_s">${data.title}</h3>
            <p className="card__description">${data.text}</p>
          </div>
          <a className="card__source" href=${data.link} target="_blank">${data.source}</a>
        </div>
      </div>
    `;
  }

  shouldComponentUpdate(nextState) {
    return JSON.stringify(this.state) !== JSON.stringify(nextState);
  }

  mapStoreToState = () => {
    const store = this.props.store.getState();
    const card = store.news.cards[this.props.key];
    this.setState({ ...card, loggedIn: store.user.loggedIn });
  }

  componentDidMount() {
    const store = this.props.store;
    this.unsubStore = store.subscribe(this.mapStoreToState);

    document.addEventListener('keydown', this.escHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escHandler);
    this.unsubStore();
  }
}
