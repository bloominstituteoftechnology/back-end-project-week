import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <input id="customBox" className="customBox" type="checkbox" />
          <label for="customBox" />

          <div className="one fas fa-pen-square" />
          <div className="two fas fa-star" />
          <div className="three fas fa-share" />
        </div>
      </div>
    );
  }
}

export default App;
