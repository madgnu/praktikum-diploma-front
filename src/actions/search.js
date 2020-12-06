import { FETCH_NEWS_REQUEST, FETCH_NEWS_SUCCESS, FETCH_NEWS_ERROR } from './types';

const searchStart = (freshStart, query) => {
  return {
    type: FETCH_NEWS_REQUEST,
    payload: { freshStart, query, keyMode: 'numbers' },
  }
};

const searchSuccess = (rData, page) => {
  let cards = [];
  if (rData.articles) {
    cards = rData.articles.map((el) => ({
      data: {
        title: el.title,
        text: el.description,
        image: el.urlToImage,
        date: el.publishedAt,
        link: el.url,
        source: el.source.name,
      }
    }));
  }
  return {
    type: FETCH_NEWS_SUCCESS,
    payload: {
      cards,
      page,
      total: rData.totalResults,
    },
  }
}

const searchError = (error) => {
  return {
    type: FETCH_NEWS_ERROR,
    payload: { error },
  }
}

const search = (query) => {
  return async (dispatch, getState) => {
    const {
      newsApi,
      lastQuery,
      currentPage = 0,
    } = getState().news;
    const q = query || lastQuery;
    const freshStart = Boolean(query);
    const page = freshStart ? 1 : currentPage + 1;

    dispatch(searchStart(freshStart, q));
    try {
      const rData = await newsApi.search({ q, page, apiKey: 'ea576070b4ad4780b5492b54195ee10b' });
      dispatch(searchSuccess(rData, page));
    } catch (err) {
      dispatch(searchError(err));
    }
  }
}

export default search;
