import './about.css';
import './__avatar/about__avatar.css';
import './__info/about__info.css';
import './__text/about__text.css';
import './__paragraph/about__paragraph.css';
import './__title/about__title.css';

import avatar from './avatar.png';
import avatar2x from './avatar2x.png';

import Component from '../../modules/component';
import parser from '../../modules/parser';

export default class About extends Component {
  render() {
    return  parser `
      <section class="root__section container">
        <div class="about">
          <picture>
            <source media="(min-width: 1440px)" srcset="${avatar2x}" />
            <img class="about__avatar" src="${avatar}" srcset="${`${avatar2x} 2x`}" alt="Фотография разработчика" />
          </picture>

          <div class="about__info">
            <h2 class="about__title title title_size_m">Об авторе</h2>
            <div class="about__text">
              <p class="about__paragraph">
                Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.
              </p>
              <p class="about__paragraph">
                Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
