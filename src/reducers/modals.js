import { MODAL_OPEN, MODAL_CLOSE, NAV_EXPAND, NAV_COLLAPSE } from '../actions/types';

export default function modalReducer(state = { modalOpened: false }, action) {
  switch (action.type) {
    case MODAL_OPEN: return { ...state, modalOpened: true, navOpened: false, ...action.payload };
    case MODAL_CLOSE: return { ...state, modalOpened: false };
    case NAV_EXPAND: return  { ...state, navOpened: true, modalOpened: false };
    case NAV_COLLAPSE: return { ...state, navOpened: false }
  }
  return state;
}
