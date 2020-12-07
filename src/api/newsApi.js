import { newsBaseUrl } from '../config';
import Api from '../modules/api';

const newsApi = new Api(newsBaseUrl, { 'Content-Type': 'application/json' }, {
  search: {
    method: 'GET',
    path: '/everything',
  },
});

export default newsApi;
