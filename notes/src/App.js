import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';

import Notes from './components/viewnotes';
import Addnote from './components/addnote';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Route path ="/notes" component={Notes}></Route>
        <Route path ='/addnote' component={Addnote}></Route>
       
      </div>
    );
  }
}

export default App;
