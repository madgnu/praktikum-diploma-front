import './card.css';
import './__body/card__body.css';
import './__image/card__image.css';
import './__date/card__date.css';
import './__description/card__description.css';
import './__source/card__source.css';
import './__header/card__header.css';
import './__toolbar/card__toolbar.css';
import './__title/card__title.css';
import './__main-info/card__main-info.css';

import Component from '../../modules/component';
import parser from '../../modules/parser';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return parser `
      <div className="card">
        <div className="card__header">
          <div className="card__toolbar">
            <button className="button button_style_tooltip button_icon_bookmark"></button>
            <button className="button button_style_sub-tooltip">Войдите, чтобы сохранять статьи</button>
          </div>
        </div>
        <img className="card__image" src="https://cdn.eso.org/images/thumb300y/eso1322a.jpg" alt="Фотография какого-то растения" />
        <div className="card__body">
          <div className="card__main-info">
            <span className="card__date">2 августа, 2019</span>
            <h3 className="card__title title title_size_s">«Первозданная тайга»: новый фотопроект Игоря Шпиленка</h3>
            <p className="card__description">
              Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...
            </p>
          </div>
          <a className="card__source" href="https://ria.ru/" target="_blank">Риа</a>
        </div>
      </div>
    `;
  }
}
