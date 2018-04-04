import React, { Component } from "react";
import "../styles/App.css";
// import { connect } from "react-redux";
import LoginPage from "./logging/LoginPage";
import Register from "./logging/Register";
const auth = true;
class App extends Component {
  render() {
    if (auth) {
      return (
        <div>
          <LoginPage />
        </div>
      );
    } else {
      return (
        <div>
          <Register />
        </div>
      );
    }
  }
}

export default App;
