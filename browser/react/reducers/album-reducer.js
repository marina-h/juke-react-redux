import { RECEIVE_ALBUMS, RECEIVE_ALBUM } from '../constants';
import axios from 'axios';

export const initialPlayerState = {
  albums: [],
  selectAlbum: {}
};

export default function (state = initialPlayerState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_ALBUM:
      newState.selectedAlbum = action.selectedAlbum;
      break;

    case RECEIVE_ALBUMS:
      newState.albums = action.albums;
      break;

    default:
      return state;
  }

  return newState;

}


