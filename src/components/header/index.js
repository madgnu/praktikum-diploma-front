import './header.css';
import './__logo/header__logo.css';
import './__links/header__links.css';
import './__nav-menu/header__nav-menu.css';
import './__minimal/header__minimal.css';
import './__menu-toggler/header__menu-toggler.css';

import Component from '../../modules/component';
import parser from '../../modules/parser';
import signout from '../../actions/signout';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
  }

  onClickSignout = (event) => {
    event.preventDefault();
    this.props.store.dispatch(signout());
  }

  onClickLogin = (event)  => {
    event.preventDefault();
  }

  render() {
    const { name, loggedIn } = this.state;

    const buttonStyle = `button button_style_transparent ${ loggedIn ? 'button_icon_logout' : '' }`;
    const buttonName = loggedIn ? name : 'Авторизоваться';
    const buttonAction = loggedIn ? this.onClickSignout : this.onClickLogin;
    return parser `
      <header class="header">
        <div class="header__minimal">
          <a class="header__logo" href="./">NewsExplorer</a>
          <div class="header__menu-toggler">
            <button class="button button_style_glyph button_icon_smart-expander"></button>
          </div>
        </div>
        <div class="header__links">
          <menu class="header__nav-menu nav nav_fat">
            <li class="nav__element">
              <a class="nav__link nav__link_active" href="./">Главная</a>
            </li>
            <li class="nav__element">
              <a class=${buttonStyle} onClick=${buttonAction} href="./">${buttonName}</a>
            </li>
          </menu>
        </div>
      </header>
    `;
  }

  mapStoreToState = () => {
    const store = this.props.store.getState().user;
    this.setState({
      loggedIn: store.loggedIn,
      name: store.name,
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
