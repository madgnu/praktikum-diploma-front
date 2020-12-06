import { FETCH_NEWS_REQUEST, FETCH_NEWS_SUCCESS, FETCH_NEWS_ERROR } from './types';

const dataMockup = {
  status: "ok",
  totalResults: 3,
  articles: [{
    source: {
      "id": null,
      "name": "bdnews24.com"
      },
    author: null,
    title: "JD.com becomes first online platform to accept China's digital currency",
    description: "Chinese e-commerce company JD.com Inc said on Saturday it has become the country's first virtual platform to accept Beijing's homegrown digital currency.",
    url: "https://bdnews24.com/business/2020/12/06/jd.com-becomes-first-online-platform-to-accept-china-s-digital-currency",
    urlToImage: "https://d30fl32nd2baj9.cloudfront.net/media/2020/12/06/china-yuan-051220-01.jpg/ALTERNATES/w640/china-yuan-051220-01.jpg",
    publishedAt: "2020-12-06T02:38:50Z",
    content: "JD Digits, the company's fintech arm, will accept digital yuan as payment for some products on its online mall, as part of an experimental giveaway of digital yuan to citizens of Suzhou, near Shangha… [+818 chars]"
  }]
}

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
      // const rData = await newsApi.search({ q, page });
      setTimeout(() => {
        dispatch(searchSuccess(dataMockup, page));
      }, 500);
      // dispatch(searchSuccess(rData, page));
    } catch (err) {
      dispatch(searchError(err));
    }
  }
}

export default search;
