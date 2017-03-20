
import type { Action } from '../actions/types';
import { OPEN_GALLERY, CLOSE_GALLERY } from '../actions/gallery';


const initialState = {
  galleryState: 'closed',
  initialPage: 0,
  images: []
};

export default function (state = initialState, action:Action) {
  if (action.type === OPEN_GALLERY) {
    return {
      ...state,
      galleryState: 'opened',
      initialPage: action.playload.initialPage,
      images: action.playload.images,
    };
  }

  if (action.type === CLOSE_GALLERY) {
    return {
      ...state,
      galleryState: 'closed',
      initialPage: 0,
      images: []
    };
  }

  return state;
}
