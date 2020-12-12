import './modal.css';
import './__container/modal__container.css';
import './__close-icon/modal__close-icon.css';
import './__title/modal__title.css';
import './__form/modal__form.css';
import './__text/modal__text.css';
import './__link/modal__link.css';

import Component from '../../modules/component';
import createRef from '../../modules/refs';

import closeModal from '../../actions/closeModal';
import Form from '../form';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    const store = this.props.store.getState();
    this.state = { ...store.modal };

    this.overlayRef = createRef();
  }

  closeModal = () => {
    this.props.store.dispatch(closeModal());
  }

  escHandler = (event) => {
    if (event.code === 'Escape') {
      this.closeModal();
    }
  }

  overlayHandler = (event) => {
    if (this.overlayRef.current() === event.target) this.closeModal();
  }

  renderForm() {
    if (this.state.form) {
      return this.parser `<${Form} />`;
    }
    return null;
  }

  switchAction = (event) => {
    event.preventDefault();
    this.props.store.dispatch(this.state.switchAction());
  }

  render() {
    return this.parser `
      <div className="modal" onClick=${this.overlayHandler} ref=${this.overlayRef}>
        <div className="modal__container">
          <div className="modal__close-icon">
            <button className="button button_style_glyph button_icon_close" onClick=${this.closeModal} />
          </div>
          <h3 className="modal__title">${this.state.title}</h3>
          ${this.renderForm()}
          <div className="modal__text">${this.state.switchActionSubText}<a className="modal__link" onClick=${this.switchAction} href="./">${this.state.switchActionText}</a></div>
        </div>
      </div>
    `;
  }

  mapStoreToState = () => {
    const store = this.props.store.getState();
    this.setState({
      ...store.modal,
    });
  }

  shouldComponentUpdate(nextState) {
    return JSON.stringify(this.state) !== JSON.stringify(nextState);
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
