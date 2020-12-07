import {
  FAVORITE_REQUEST,
  FAVORITE_SUCCESS,
  FAVORITE_ERROR,
  FETCH_NEWS_ERROR,
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
} from '../actions/types';
import newsApi from '../api/newsApi';

export default function newsReducer(state = { cards: [], newsApi }, action) {
  switch (action.type) {
    case FETCH_NEWS_REQUEST: {
      const { query: lastQuery, freshStart, keyMode = 'numbers' } = action.payload;
      const cards = freshStart ? [] : state.cards;

      return { ...state, loading: true, cards, lastQuery, searchError: null, keyMode };
    }
    case FETCH_NEWS_SUCCESS: return {
      ...state,
      loading: '',
      cards: [...state.cards, ...action.payload.cards],
      currentPage: action.payload.page,
      total: action.payload.total,
    };
    case FETCH_NEWS_ERROR: return { ...state, loading: false, searchError: action.payload.error };

    case FAVORITE_REQUEST: {
      const key = action.payload;
      const newCards = state.cards.map((card, i) => {
        if (key === i || card._id === key) {
          return {
            ...card,
            loading: true,
            error: null,
          }
        }
        return card;
      })
      return { ...state, cards: newCards };
    }

    case FAVORITE_SUCCESS: {
      const { key, _id, deleteCard } = action.payload;
      let newCards = [];
      if (deleteCard) {
        newCards = state.cards.filter((el, i) => el._id !== key && i !== key)
      } else {
        newCards = state.cards.map((card, i) =>  {
          if  (key === i || card._id === key) {
            return {
              ...card,
              loading: false,
              error: null,
              _id,
            }
          }
          return card;
        });
      }
      return { ...state, cards: newCards };
    }

    case FAVORITE_ERROR: {
      const { key, error } = action.payload;
      const newCards = state.cards.map((card, i) =>  {
        if  (key === i || card._id === key) {
          return {
            ...card,
            loading: false,
            error,
          }
        }
        return card;
      });
      return { ...state, cards: newCards };
    }
  }
  return state;
}
