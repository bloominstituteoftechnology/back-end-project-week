import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AllNotes from './AllNotes/AllNotes';
import SingleNote from './SingleNote/SingleNote';
import NewNote from './NewNote/NewNote';
import UserCreate from './UserCreate/userCreate';
import UserLogin from './UserLogin/userLogin';
import UserLogout from './UserLogout/userLogout';
import RequireAuth from './HOC/RequireAuth';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={RequireAuth(AllNotes)} />
          <Route path="/new-note" component={RequireAuth(NewNote)} />
          <Route path="/notes/:id" component={RequireAuth(SingleNote)} />
          <Route path="/register" component={UserCreate} />
          <Route path="/login" component={UserLogin} />
          <Route path="/logout" component={RequireAuth(UserLogout)} />
        </div>
      </Router>
    );
  }
}

export default App;
