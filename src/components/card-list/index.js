import './card-list.css';

import Component from '../../modules/component';
import parser from '../../modules/parser';

import Card from '../card';

export default class CardList extends Component {
  render() {
    return parser `
      <div class="search-results__list card-list">
        <${Card} />
      </div>
    `;
  }
}
