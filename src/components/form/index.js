import './form.css';
import './__input/form__input.css';
import './__submit/form__submit.css';
import './__label/form__label.css';
import './__error/form__error.css';
import './__field/form__field.css';

import Component from '../../modules/component';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.formName = `__AUTO__${Date.now()}__`;
    const store = this.props.store.getState();
    this.state = {
      ...store.modal.form,
      loading: store.user.loading || false,
    }
  }

  renderField(field) {
    const fieldId = `${this.formName}_${field.name}`;

    return this.parser `
      <div className="form__field">
        <label className="form__label" for=${fieldId}>${field.label}</label>
        <input ${field.definition}
          className="form__input input input_style_modal"
          name="${field.name}"
          id=${fieldId}
        />
        <span className="form__error">${field.errMessage}</span>
      </div>`;
  }

  onSubmit = (event) => {
    event.preventDefault();
    const store = this.props.store;
    const form = document.forms[this.formName];
    const inputs = [...form.elements].filter((el) => el.tagName === 'INPUT');
    const retData = {};
    inputs.forEach((el) => retData[el.name] = el.value);
    store.dispatch(this.state.submitAction(retData));
  }

  render() {
    const submitText = this.state.loading ? 'Загружаем...' : this.state.submitName;
    const submitClassName = this.state.loading ? 'button_icon_loading' : '';
    const fieldsMarkup = this.state.fields.map((el) => this.renderField(el));
    return this.parser `
      <form name=${this.formName} className="modal__form form" action="/" onSubmit=${this.onSubmit}>
        ${fieldsMarkup}
        <button type="submit" className=${`form__submit button ${submitClassName}`} disabled=${this.state.loading}>${submitText}</button>
      </form>
    `;
  }

  mapStoreToState = () => {
    const store = this.props.store.getState();
    this.setState({
      ...store.modal.form,
      loading: store.user.loading || false,
    });
  }

  shouldComponentUpdate(nextState) {
    return JSON.stringify(this.state) !== JSON.stringify(nextState);
  }

  componentDidMount() {
    const store = this.props.store;
    this.unsubStore = store.subscribe(this.mapStoreToState);
  }

  componentWillUnmount() {
    this.unsubStore();
  }
}
