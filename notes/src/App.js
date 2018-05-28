import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import AllNotes from './AllNotes/AllNotes';
import SingleNote from './SingleNote/SingleNote';
import NewNote from './NewNote/NewNote';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" component={AllNotes} exact />
          <Route path="/new-note" component={NewNote} />
          <Route path="/notes/:id" component={SingleNote} />
        </div>
      </Router>
    );
  }
}

export default App;
