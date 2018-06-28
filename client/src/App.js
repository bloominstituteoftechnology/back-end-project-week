import React, { Component } from 'react';
import { Route, } from "react-router-dom";
import Landing from "./components/Landing";
import Signin from "./components/Signin";
import Posts from "./components/Posts";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/posts" component={Posts} />
      </div>
    );
  }
}

export default App;
