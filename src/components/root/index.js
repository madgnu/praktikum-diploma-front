import './__content/root__content.css';
import './__section/root__section.css';
import './__footer/root__footer.css';
import './__headliner/root__headliner.css';
import './__section/_theme/root__section_theme_gray.css';
import './__section/_theme/root__section_theme_headliner.css';
import './root.css';


import Component from '../../modules/component';
import parser from '../../modules/parser';

import Header from '../header';
import Footer from '../footer';

export default class Root extends Component {
  render() {
    return parser `
      <>
        <div className="container container_slim container_overhang container_dashed">
          <${Header} />
        </div>
        <main className="root__content">
          ${this.props.children}
        </main>
        <${Footer} />
      </>`;
  }
}
