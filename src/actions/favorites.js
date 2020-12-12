import { FAVORITE_ERROR, FAVORITE_REQUEST, FAVORITE_SUCCESS } from './types';

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

const favoriteSuccess = (key, rData, deleteCard = false) => {
  return {
    type: FAVORITE_SUCCESS,
    payload: {
      key,
      deleteCard,
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

export const deleteFavorite = (key, deleteCard = false) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const { userApi } = state.user;
      const { keyMode, cards } = state.news;
      dispatch(favoriteRequest(key));
      const articleId = (keyMode === 'numbers') ? cards[key]._id : key;
      await userApi.removeFavorite({ articleId });
      dispatch(favoriteSuccess(key, { _id: null }, deleteCard));
    } catch (err) {
      dispatch(favoriteError(err, key));
    }
  }
}
