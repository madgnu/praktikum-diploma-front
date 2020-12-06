import './modal.css';
import './__container/modal__container.css';
import './__close-icon/modal__close-icon.css';
import './__title/modal__title.css';
import './__form/modal__form.css';
import './__text/modal__text.css';
import './__link/modal__link.css';

import Component from '../../modules/component';
import parser from '../../modules/parser';
import closeModal from '../../actions/closeModal';

export default class Modal extends Component {
  closeModal = () => {
    this.props.store.dispatch(closeModal());
  }

  escHandler = (event) => {
    if (event.code === 'Escape') {
      this.closeModal();
    }
  }

  render() {
    return parser `
      <div className="modal">
        <div className="modal__container">
          <div className="modal__close-icon">
            <button className="button button_style_glyph button_icon_close" onClick=${this.closeModal} />
          </div>
          <h3 className="modal__title">${this.props.title}</h3>
          ${this.props.children}
        </div>
      </div>
    `;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escHandler);
  }
}
