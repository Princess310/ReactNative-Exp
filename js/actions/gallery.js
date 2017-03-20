
import type { Action } from './types';

export const OPEN_GALLERY = 'OPEN_GALLERY';
export const CLOSE_GALLERY = 'CLOSE_GALLERY';

export function oepnGallery(initialPage, images) {
  return {
    type: OPEN_GALLERY,
    playload: {
    	initialPage: initialPage,
    	images: images,
    }
  };
}

export function closeGallery() {
  return {
    type: CLOSE_GALLERY,
  };
}
