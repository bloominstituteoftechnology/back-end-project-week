import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';

import Notes from './components/viewnotes';
import Addnote from './components/addnote';
import Singlenote from './components/singlenote';
import Sidebar from './components/sidebar';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar/>
       <Route exact path ="/" component={Notes}></Route>
       
        <Route path ='/addnote' component={Addnote}></Route>
       <Route path ='/notes/:id' component={Singlenote}></Route>
       
      </div>
    );
  }
}

export default App;
