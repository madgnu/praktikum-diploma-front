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
      const { query: lastQuery, freshStart } = action.payload;
      const cards = freshStart ? [] : state.cards;

      return { ...state, loading: true, cards, lastQuery, searchError: null };
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
      const cardNumber = action.payload;
      const newCards = state.cards.map((card, i) => {
        if (cardNumber === i) {
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
      const { key, _id } = action.payload;
      const newCards = state.cards.map((card, i) =>  {
        if  (key === i) {
          return {
            ...card,
            loading: false,
            error: null,
            _id,
          }
        }
      });
      return { ...state, cards: newCards };
    }

    case FAVORITE_ERROR: {
      const { key, error } = action.payload;
      const newCards = state.cards.map((card, i) =>  {
        if  (key === i) {
          return {
            ...card,
            loading: false,
            error,
          }
        }
      });
      return { ...state, cards: newCards };
    }
  }
  return state;
}
