import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import NoteList from "./components/NoteList"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => <Redirect from="/" to="/login" />}
        />
        <Route exact path="/login" component={Login} />
        <Route path="/notes" component={NoteList} />
        <Route path="/register" component={Register} />
        {/* <Route path="/users" component={Home} /> */}
        {/* <Route path="/notes/create" component={Home} /> */}
      </div>
    );
  }
}

export default App;
