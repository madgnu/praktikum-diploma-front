import { FETCH_NEWS_ERROR, FETCH_NEWS_REQUEST, FETCH_NEWS_SUCCESS } from '../actions/types';

export default function newsReducer(state, action) {
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
    case FETCH_NEWS_ERROR: return {
      ...state,
      loading: false,
      searchError: action.payload.error,
    }
  }
  return state;
}
