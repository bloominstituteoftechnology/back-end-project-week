import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { Route } from "react-router";
import Register from "./components/Register";
import Login from "./components/Login";
import Notes from "./components/Notes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">NOTED</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/notes" component={Notes} />
      </div>
    );
  }
}

export default App;
