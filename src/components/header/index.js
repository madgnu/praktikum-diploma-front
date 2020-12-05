import './header.css';
import './__logo/header__logo.css';
import './__links/header__links.css';
import './__nav-menu/header__nav-menu.css';
import './__minimal/header__minimal.css';
import './__menu-toggler/header__menu-toggler.css';

import Component from '../../modules/component';
import parser from '../../modules/parser';

export default class Header extends Component {
  render() {
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
              <a class="button button_style_transparent" href="./">
                Авторизоваться
              </a>
            </li>
          </menu>
        </div>
      </header>
    `;
  }
}
