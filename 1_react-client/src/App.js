import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";

import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">NoteIt.</p>
        <Route exact path="/" component={Home} />
        {/* <Route path="/notes" component={NoteList} /> */}
        {/* <Route path="/register" component={Home} /> */}
        {/* <Route path="/users" component={Home} /> */}
        {/* <Route path="/notes/create" component={Home} /> */}
      </div>
    );
  }
}

export default App;
