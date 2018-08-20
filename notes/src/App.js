import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';

import Notes from './components/viewnotes';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Route path ="/notes" component={Notes}></Route>

       
      </div>
    );
  }
}

export default App;
