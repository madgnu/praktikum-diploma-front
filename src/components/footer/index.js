import './footer.css';
import './__copyright/footer__copyright.css';
import './__links/footer__links.css';

import Component from '../../modules/component';

export default class Footer extends Component {
  render() {
    return this.parser `
      <footer className="root__footer container container_slim footer">
        <span className="footer__copyright">© 2020 Supersite, Powered by News API</span>
        <div className="footer__links">
          <ul className="nav">
            <li className="nav__element"><a className="nav__link" href="./">Главная</a></li>
            <li className="nav__element"><a className="nav__link" href="https://praktikum.yandex.ru/" target="_blank">Яндекс.Практикум</a></li>
          </ul>
          <ul className="nav nav_no-transform">
            <li className="nav__element"><a className="nav__link nav__link_icon_github" href="https://praktikum.yandex.ru/" target="_blank"></a></li>
            <li className="nav__element"><a className="nav__link nav__link_icon_facebook" href="https://www.facebook.com/" target="_blank"></a></li>
          </ul>
        </div>
      </footer>
    `;
  }
}
