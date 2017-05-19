import {START_PLAYING, STOP_PLAYING, SET_CURRENT_SONG, SET_LIST} from '../constants';
import axios from 'axios';
import AUDIO from '../audio';

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

export const setList = function(currentSongList) {
	return {
		type: SET_LIST,
		currentSongList
	}
}

export const play = ()=> {
  return dispatch => {
    // side effects, like using the audio element belong in async action creators too, even if they aren't "async"
    AUDIO.play() 
    dispatch(startPlaying());
  }
}

export const pause = ()=> {
	return dispatch => {
		AUDIO.pause();
		dispatch(stopPlaying);
	}
}


play () {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }

  pause () {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }

  load (currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({
      currentSong: currentSong,
      currentSongList: currentSongList
    });
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }
