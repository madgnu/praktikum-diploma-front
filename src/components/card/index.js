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
  render() {
    const data = this.props.data;
    return parser `
      <div className="card">
        <div className="card__header">
          <div className="card__toolbar">
            <button className="button button_style_tooltip button_icon_bookmark"></button>
            <button className="button button_style_sub-tooltip">Войдите, чтобы сохранять статьи</button>
          </div>
        </div>
        <img className="card__image" src=${data.urlToImage} alt="Фотография какого-то растения" />
        <div className="card__body">
          <div className="card__main-info">
            <span className="card__date">2 августа, 2019</span>
            <h3 className="card__title title title_size_s">${data.title}</h3>
            <p className="card__description">${data.description}</p>
          </div>
          <a className="card__source" href=${data.url} target="_blank">${data.source.name}</a>
        </div>
      </div>
    `;
  }
}
