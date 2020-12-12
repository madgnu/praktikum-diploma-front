import './headliner.css';
import './__title/headliner__title.css';
import './__subtitle/headliner__subtitle.css';
import './__search-form/headliner__search-form.css';
import './__search-submit/headliner__search-submit.css';
import './__search-field/headliner__search-field.css';

import Component from '../../modules/component';
import createRef from '../../modules/refs';

import search from '../../actions/search';

export default class Headliner extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.store.dispatch(search(this.inputRef.current().value));
  }

  render () {
    return this.parser `
      <section className="root__section root__section_theme_headliner">
        <div className="root__headliner container">
          <div className="headliner">
            <h1 className="headliner__title title">Что творится в мире?</h1>
            <h2 className="headliner__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</h2>
            <form className="headliner__search-form" action="/" onSubmit=${this.onSubmit}>
              <input className="headliner__search-field input" placeholder="Введите тему новости" minlength="5" maxlength="30" required=${true} ref=${this.inputRef} />
              <input className="headliner__search-submit button" type="submit" value="Искать" />
            </form>
          </div>
        </div>
      </section>
    `;
  }
}
