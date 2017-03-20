
import type { Action } from '../actions/types';
import { FETCH_APP_LSIT } from '../actions/app';

const initialState = {
  list: [],
};

export default function (state = initialState, action:Action) {
  if (action.type === FETCH_APP_LSIT) {
    return {
      list: [
        ...state,
        ...action.payload,
      ],
    }
  }

  return state;
}
