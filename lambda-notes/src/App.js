import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ViewNotes from './components/ViewNotes';
import DisplayOne from './components/DisplayOne';
import CreateNote from './components/CreateNote';
import './App.css';
import Header from './components/Header';
import RequireAuth from './components/HOC/RequireAuth';
import SignUp from './components/SignUp';
import Login from './components/Login';
import GetUsers from './components/GetUsers';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Header} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={RequireAuth(ViewNotes)} />
          <Route path="/users" component={RequireAuth(GetUsers)} />
          <Route path="/create-new-note" component={CreateNote} />
          <Route path="/view-note/:id" component={DisplayOne} />
          {/* <Route path="/view-note/:id" component={RequireAuth(DisplayOne)} />
          <Route path="/users" component={RequireAuth(GetUsers)} />
          <Route path="/create-new-note" component={RequireAuth(CreateNote)} /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;