import { FETCH_NEWS_REQUEST, FETCH_NEWS_SUCCESS, FETCH_NEWS_ERROR } from './types';

const loadStart = () => {
  return {
    type: FETCH_NEWS_REQUEST,
    payload: {
      freshStart: true,
      keyMode: 'ids',
    }
  }
}

const loadSuccess = (rData) => {
  let cards = [];
  if (rData && rData.length) {
    cards = rData.map((el) => ({
      data: {
        title: el.title,
        text: el.text,
        image: el.image,
        date: el.date,
        link: el.link,
        source: el.source,
        keyword: el.keyword,
      },
      _id: el._id,
    }));
  }
  return {
    type: FETCH_NEWS_SUCCESS,
    payload: {
      cards,
      total: cards.length,
    }
  }
}

const loadError = (error) => {
  return {
    type: FETCH_NEWS_ERROR,
    payload: { error },
  }
}

const loadFavorites = () => {
  return async (dispatch, getState) => {
    try {
    const { userApi } = getState().user;
      dispatch(loadStart());
      const rData = await userApi.getFavorites();
      dispatch(loadSuccess(rData));
    } catch (err) {
      dispatch(loadError(err));
    }
  }
}

export default loadFavorites;
