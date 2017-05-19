import React from 'react';

export default function Lyrics(props) {

  const artistChange = event => {
    props.setArtist(event.target.value);
  }

  const songChange = event => {
    props.setSong(event.target.value);
  }

  return (
    <div id="lyrics">
      <form onSubmit={props.handleSubmit}>
        <div>
          <input
            placeholder="Artist"
            type="text"
            onChange={artistChange}
            value={props.artistQuery} />
          <input
            placeholder="Song"
            type="text"
            onChange={songChange}
            value={props.songQuery} />
        </div>
        <pre>{ props.text || 'Search above!' }</pre>
        <button type="submit">Search for Lyrics</button>
      </form>
    </div>
  )
}
