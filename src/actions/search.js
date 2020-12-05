import { FETCH_NEWS_REQUEST, FETCH_NEWS_SUCCESS } from "./types";

const searchStart = (freshStart, query) => {
  return {
    type: FETCH_NEWS_REQUEST,
    payload: { freshStart, query },
  }
};

const searchSuccess = (rData) => {
  return {
    type: FETCH_NEWS_SUCCESS,
    payload: rData.articles,
  }
}

const search = (query) => {
  return async (dispatch, getState) => {
    const api = getState().newsApi;
    const q = query || getState().lastQuery;

    dispatch(searchStart(Boolean(query), q));
    const rData = await api.search({ q });
    dispatch(searchSuccess(rData));
  }
}

export default search;
