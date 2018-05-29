import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Notes from './components/display';

class App extends Component {
  render() {
    return (
      <div className="App">
   <Route exact path="/" component={Notes} />
      </div>
    );
  }
}

export default App;
