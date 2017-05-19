import React, {Component} from 'react';
import Lyrics from '../components/Lyrics';
import axios from 'axios';

import { setLyrics, fetchLyrics } from '../action-creators/lyrics';
import store from '../store';

export default class LyricsContainer extends Component {

	constructor(){
		super()

		this.state = Object.assign({
      artistQuery: '',
      songQuery: ''
    }, store.getState());

    this.setArtist = this.setArtist.bind(this);
    this.setSong = this.setSong.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		this.unsubscribe = store.subscribe(() => {
        this.setState(store.getState());
    });
	}

	componentWillUnmount(){
		this.unsubscribe();
	}

  setArtist(artist) {
    this.setState({  artistQuery: artist });
  }

  setSong(song) {
    this.setState({ songQuery: song });
  }

  handleSubmit(event) {
    console.log('this.state', this.state);
    event.preventDefault();

    if (this.state.artistQuery && this.state.songQuery) {
      // axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
      // .then(res => res.data)
      // .then(data => {
      //   const setLyricsAction = setLyrics(data.lyric);
      //   store.dispatch(setLyricsAction);
      // })
      store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery));
    }
  }

	render() {
		return (
      <Lyrics
        text={this.state.lyrics.text}
        setArtist={this.setArtist}
        setSong={this.setSong}
        handleSubmit={this.handleSubmit}
        artistQuery={this.state.artistQuery}
        songQuery={this.state.songQuery}
      />
		)
	}
}
