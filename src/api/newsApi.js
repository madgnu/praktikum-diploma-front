import Api from '../modules/api';

const newsApi = new Api('http://newsapi.org/v2', { 'Authorization' : 'ea576070b4ad4780b5492b54195ee10b' }, {
  search: {
    method: 'GET',
    path: '/everything'
  }
});

export default newsApi;
