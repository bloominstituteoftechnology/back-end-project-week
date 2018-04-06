import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateNote from './createNote';
import ViewNotes from './ViewNotes';
import ViewSingleNote from './ViewSingleNote';
import EditNote from './EditNote';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" component={ViewNotes} exact />
            <Route path="/viewnotes" component={ViewNotes} />
            <Route path="/createnote" component={CreateNote} />
            <Route path="/viewsinglenote/:id" component={ViewSingleNote} />
            <Route path="/editnote/:id" component={EditNote} />
          </div>
        </Router>
      </div>	
    );
  }
}

export default App;
