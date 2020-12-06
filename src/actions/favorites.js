import { FAVORITE_ERROR, FAVORITE_REQUEST, FAVORITE_SUCCESS } from "./types";

const favoriteRequest = (key) => {
  return {
    type: FAVORITE_REQUEST,
    payload: key,
  }
}

const favoriteError = (error, key) => {
  return {
    type: FAVORITE_ERROR,
    payload: {
      error,
      key,
    },
  }
}

const favoriteSuccess = (key, rData) => {
  return {
    type: FAVORITE_SUCCESS,
    payload: {
      key,
      _id: rData._id,
    }
  }
}

export const addFavorite = (key) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const { userApi } = state.user;
      const { lastQuery } = state.news;
      dispatch(favoriteRequest(key));
      const card = state.news.cards[key].data;
      const rData = await userApi.addFavorite(null, {
        ...card,
        keyword:lastQuery,
      });
      dispatch(favoriteSuccess(key, rData));
    } catch (err) {
      dispatch(favoriteError(err, key));
    }
  }
}

export const deleteFavorite = (key) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const { userApi } = state.user;
      dispatch(favoriteRequest(key));
      const card = state.news.cards[key];
      await userApi.removeFavorite({
        articleId: card._id,
      });
      dispatch(favoriteSuccess(key, { _id: null }));
    } catch (err) {
      dispatch(favoriteError(err, key));
    }
  }
}
