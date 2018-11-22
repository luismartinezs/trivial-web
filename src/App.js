import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Trivial Game</h1>
        <p>Answer 10 random questions and try to score a 10!</p>
        <button>Play</button>
      </div>
    );
  }
}

export default App;
