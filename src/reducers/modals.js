import { MODAL_OPEN, MODAL_CLOSE } from '../actions/types';

export default function modalReducer(state = { modalOpened: false }, action) {
  switch (action.type) {
    case MODAL_OPEN: return { ...state, modalOpened: true, ...action.payload };
    case MODAL_CLOSE: return { ...state, modalOpened: false };
  }
  return state;
}
