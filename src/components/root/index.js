import './__content/root__content.css';
import './__section/root__section.css';
import './__footer/root__footer.css';
import './__headliner/root__headliner.css';
import './__section/_theme/root__section_theme_gray.css';
import './__section/_theme/root__section_theme_headliner.css';
import './root.css';


import Component from '../../modules/component';

import Header from '../header';
import Footer from '../footer';
import Modal from '../modal';

export default class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpened: false,
      navOpened: false,
    };
  }

  renderModal() {
    if (this.state.modalOpened) {
      return this.parser `<${Modal} />`;
    }
    return null;
  }

  render() {
    const overhangHeaderClass = this.props.overhangHeader ? 'container_overhang' : '';
    const modalOpenedClass = this.state.modalOpened ? 'root_expanded_modal' : '';
    const navExpandedClass = this.state.navOpened ? 'root_expanded_nav' : '';
    return this.parser `
      <div className=${`root ${modalOpenedClass} ${navExpandedClass}`}>
        <div className=${`container container_slim container_dashed ${overhangHeaderClass}`}>
          <${Header} pageName=${this.props.pageName} redirectOnSignout=${this.props.redirectOnSignout} />
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
      navOpened: store.modal.navOpened,
    });
  }

  shouldComponentUpdate(nextState) {
    return this.state.modalOpened !== nextState.modalOpened || this.state.navOpened !== nextState.navOpened;
  }

  componentDidMount() {
    const store = this.props.store;
    this.unsubStore = store.subscribe(this.mapStoreToState);
  }

  componentWillUnmount() {
    this.unsubStore();
  }
}
