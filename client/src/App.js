import React, { Component } from 'react';
import './App.css';
import Emotion from './components/Emotion';
import SongForm from './components/SongForm';
import Song from './components/Song';
import {__loadSongs, __createSong, __destroySong, __updateSong, __voteOnSong} from './lib/songService';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      songs : [],
    }

    this.emotions = [
       { "angry" : "opp" }, 
       { "anxious" : "opp" }, 
       { "bored" : "opp" }, 
       { "empty" : "opp" },
       { "guilty" : "opp" }, 
       { "hopeless" : "opp" }, 
       { "indecisive" : "opp" },
       { "jealous" : "opp" }, 
       { "lonely" : "opp" }, 
       { "negative" : "opp" }, 
       { "sad" : "opp" }, 
       { "selfish" : "opp" },
       { "stressed" : "opp" },
       { "tired" : "opp" }, 
       { "worthless" : "opp" }
     ];

    //when you use arrow syntax for functions, es7 will autobind those functions to the component
      //so you don't need these lines here
    //--
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleRemove = this._handleRemove.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
    this._handleVote = this._handleVote.bind(this);
    //--
  }

  // componentDidMount() {
  //   __loadSongs()
  //     .then(songs => this.setState({songs}))
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   //clear the song form inputs if the component updates
  //   document.querySelector('#songForm').children[0].value = "";
  //   document.querySelector('#songForm').children[1].value = "";
  // }

  _handleSubmit = (evt) => {
    evt.preventDefault();

    let newSong = {artist: evt.target.children[0].value, songName: evt.target.children[1].value, votes: 0};

    __createSong(newSong)
      .then((savedSong) => { //we do this because the savedSong will have an _id while newSong won't 
        let songsUpdated = [...this.state.songs, savedSong];

        const songs = songsUpdated.sort(function(a, b) {
          return b.votes - a.votes;
        });

        this.setState({
          songs
        });
      })
  }

  _handleRemove = (evt) => {
    evt.preventDefault();

    let songId = evt.target.getAttribute('data-songid');

    __destroySong(songId)
      .then((oldSongId) => {
        
        let songs = this.state.songs.filter((song, i) => song._id !== oldSongId)

        this.setState({
          songs
        });
      })
  }

  _handleUpdate = (evt) => {
    evt.preventDefault();
    let songId = evt.target.getAttribute("data-songid")
    let updatedSong = {artist: evt.target.children[0].value, songName: evt.target.children[1].value};

    let songsInState = this.state.songs;

    __updateSong(updatedSong, songId).then((song) => {
      //this will return a new array of : [1, 2, 99, 4, 5]
        //[1,2,3,4,5].map((a) => (a == 3) ? 99 : a);
      let songs = songsInState.map((sng) => {
        return (sng._id === song._id) ? song : sng
      });

      this.setState({
        songs
      })
    });
  }

  _handleVote = (evt) => {
    evt.preventDefault();

    let songId = evt.target.getAttribute("data-songid");
    let direction = evt.target.getAttribute("data-direction");

    let songsInState = this.state.songs;

    __voteOnSong(songId, direction).then((song) => {
      //this will return a new array of : [1, 2, 99, 4, 5]
        //[1,2,3,4,5].map((a) => (a == 3) ? 99 : a);
      let songsUpdated = songsInState.map((sng) => {
        return (sng._id === song._id) ? song : sng
      });

      const songs = songsUpdated.sort(function(a, b) {
        return b.votes - a.votes;
      });

      this.setState({
        songs
      })
    });
  }

  render() {    
    return (
      <div className="App">
        <h1>Make It Better</h1>

        <br /><br />
       
  <br /><br />
        <form onSubmit={this._handleEmotion}>
          <ul>
            {this.emotions.map((emo, ind) => <Emotion 
              key={ind} 
              emotion={Object.keys(emo)[0]} 
              />)}
          </ul>
          <input type="submit" />

        </form>

        <br /><br />
      </div>
    );
  }
}
export default App;
