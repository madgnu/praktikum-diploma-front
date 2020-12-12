import './header.css';
import './__logo/header__logo.css';
import './__links/header__links.css';
import './__nav-menu/header__nav-menu.css';
import './__minimal/header__minimal.css';
import './__menu-toggler/header__menu-toggler.css';

import Component from '../../modules/component';
import parser from '../../modules/parser';
import signout from '../../actions/signout';
import openModal from '../../actions/openModal';
import closeModal from '../../actions/closeModal';
import { collapseNav, expandNav } from '../../actions/nav';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
  }

  onClickSignout = (event) => {
    event.preventDefault();
    this.props.store.dispatch(signout(this.props.redirectOnSignout));
  }

  onClickLogin = (event)  => {
    event.preventDefault();
    this.props.store.dispatch(openModal('login'));
  }

  onClickExpander = (event) => {
    event.preventDefault();
    if (this.state.modalOpened) {
      return this.props.store.dispatch(closeModal());
    }
    if (this.state.navOpened) {
      return this.props.store.dispatch(collapseNav());
    }
    this.props.store.dispatch(expandNav());
  }

  render() {
    const { name, loggedIn } = this.state;

    const links = [{ href: './', title: 'Главная' }];
    if (loggedIn) links.push({ href: './favorites.html', title: 'Сохраненные статьи' });
    const linksMarkup = links.map((el) =>
      parser `
        <li className="nav__element" key=${el.title}>
          <a className=${`nav__link ${ (el.title === this.props.pageName) ? 'nav__link_active' : '' }`} href=${el.href}>${el.title}</a>
        </li>`
    );

    const buttonStyle = `button button_style_transparent ${ loggedIn ? 'button_icon_logout' : '' }`;
    const buttonName = loggedIn ? name : 'Авторизоваться';
    const buttonAction = loggedIn ? this.onClickSignout : this.onClickLogin;
    return parser `
      <header className="header">
        <div className="header__minimal">
          <a className="header__logo" href="./">NewsExplorer</a>
          <div className="header__menu-toggler">
            <button className="button button_style_glyph button_icon_smart-expander" onClick=${this.onClickExpander}></button>
          </div>
        </div>
        <div className="header__links">
          <menu className="header__nav-menu nav nav_fat">
            ${linksMarkup}
            <li className="nav__element" key="log-button">
              <a className=${buttonStyle} onClick=${buttonAction} href="./">${buttonName}</a>
            </li>
          </menu>
        </div>
      </header>
    `;
  }

  mapStoreToState = () => {
    const { user, modal } = this.props.store.getState();
    this.setState({
      loggedIn: user.loggedIn,
      name: user.name,
      modalOpened: modal.modalOpened,
      navOpened: modal.navOpened,
    });
  }

  shouldComponentUpdate(nextState) {
    return this.state.loggedIn !== nextState.loggedIn;
  }

  componentDidMount() {
    const store = this.props.store;
    this.unsubStore = store.subscribe(this.mapStoreToState);
  }

  componentWillUnmount() {
    this.unsubStore();
  }
}
