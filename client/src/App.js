import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login/" component={LoginForm} />
        <Route path="/register/" component={RegisterForm} />
      </Switch>
    );
  }
}

export default App;
