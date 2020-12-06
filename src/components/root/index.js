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
import Modal from '../modal';

export default class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpened: false,
    };
  }

  renderModal() {
    if (this.state.modalOpened) {
      return parser `
        <${Modal} store=${this.props.store} />
      `;
    }
    return null;
  }

  render() {
    const overhangHeaderClass = this.props.overhangHeader ? 'container_overhang' : '';
    return parser `
      <div className="root">
        <div className=${`container container_slim container_dashed ${overhangHeaderClass}`}>
          <${Header} store=${this.props.store} pageName=${this.props.pageName} />
        </div>
        <main className="root__content">
          ${this.props.children}
        </main>
        <${Footer} />
        ${this.renderModal()}
      </div>`;
  }

  mapStoreToState = () => {
    const store = this.props.store.getState();
    this.setState({
      modalOpened: store.modal.modalOpened,
    });
  }

  shouldComponentUpdate(nextState) {
    return this.state.modalOpened !== nextState.modalOpened;
  }

  componentDidMount() {
    const store = this.props.store;
    this.unsubStore = store.subscribe(this.mapStoreToState);
  }

  componentWillUnmount() {
    this.unsubStore();
  }
}
