import React, { Component } from 'react';
import './App.css';
import click1 from './assets/click1.wav'
import click2 from './assets/click2.wav'

class App extends Component {
  constructor(props){
    super(props)

    this.state ={
       bpm: 100,
      playing: false,
      count: 0,
      beatsPerMeasure: 4
    }

    this.click1 = new Audio(click1)
    this.click2 = new Audio(click2)

  }

handleBpmChange =(e) => {
  const bpm = e.target.value
  if(this.state.playing){
    clearInterval(this.timer);
    this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
    this.setState({
          count: 0,
          bpm
        });
  }else {
    this.setState({bpm})

  }
}

playClick = () => {
  const { count, beatsPerMeasure } = this.state;

  // The first beat will have a different sound than the others
  if (count % beatsPerMeasure === 0) {
    this.click2.play();
  } else {
    this.click1.play();
  }

  // Keep track of which beat we're on
  this.setState(state => ({
    count: (state.count + 1) % state.beatsPerMeasure
  }));
}

startStop = () => {
  // this.click1.play()
  if(this.state.playing){
    // Stop the timer
    clearInterval(this.timer);
    this.setState({
      playing: false
    });
  } else {
    this.timer = setInterval(
      this.playClick,
      (60 / this.state.bpm) * 1000
    );
    this.setState({
      count: 0,
        playing: true
    },
  this.playClick)
  }
}

  render() {
    const { playing, bpm } = this.state;


    return (
      <div className="metronome">
      <div className="bpm-slider">
      <div>{bpm} BPM</div>
      <input type="range" min='60' max='240' value={bpm} onChange={this.handleBpmChange}/>
      </div>
      <button onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</button>
      </div>
    );
  }
}

export default App;
