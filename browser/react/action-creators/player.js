import {START_PLAYING, STOP_PLAYING, SET_CURRENT_SONG, SET_LIST} from '../constants';
import axios from 'axios';
import AUDIO from '../audio';
import { skip } from '../utils';

export const startPlaying = function () {
  return {
    type: START_PLAYING
  };
};

export const stopPlaying = function () {
  return {
    type: STOP_PLAYING
  };
};

export const setCurrentSong = function(currentSong) {
	return {
		type: 	SET_CURRENT_SONG,
		currentSong
	}
}

export const setCurrentSongList = function(currentSongList) {
	return {
		type: SET_LIST,
		currentSongList
	}
}

export const play = () => {
  return dispatch => {
    // side effects, like using the audio element belong in async action creators too, even if they aren't "async"
    AUDIO.play()
    dispatch(startPlaying());
  }
}

export const pause = () => {
	return dispatch => {
		AUDIO.pause();
		dispatch(stopPlaying);
	}
}

export const load = (currentSong, currentSongList) => dispatch => {
  AUDIO.src = currentSong.audioUrl;
  AUDIO.load();
  dispatch(setCurrentSongList(currentSongList))
  dispatch(setCurrentSong(currentSong));
}

export const startSong = (song, list) => (dispatch) => {
  dispatch(pause());
  dispatch(load(song, list));
  dispatch(play());
}

export const toggle = () => (dispatch, getState) => {
  if (getState().player.isPlaying) {
    dispatch(pause())
  } else {
    dispatch(play());
  }
}

export const toggleOne = (selectedSong, selectedSongList) =>
  (dispatch, getState) => {
  if (selectedSong.id !== getState().player.currentSong.id) {
    dispatch(startSong(selectedSong, selectedSongList));
  } else {
    dispatch(toggle());
  }
}

export const next = () => (dispatch, getState) => {
  dispatch(startSong(...skip(1, getState().player)));
}

export const prev = () => (dispatch, getState) => {
  dispatch(startSong(...skip(-1, getState().player)));
}
