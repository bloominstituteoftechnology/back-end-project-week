import React, { Component } from "react";
import "./App.css";
import AccountCreate from "./Components/AccountCreate";
import Login from "./Components/Login";
import UserComponent from "./Components/UserComponent";

class App extends Component {
  state = {
    login: false,
    createAccount: true,
    me: false,
  };

  togglelogin = componentName => {
    if (componentName === "createAccount") {
      this.setState({ login: true, createAccount: false });
    }
    if (componentName === "login") {
      this.setState({ login: false, createAccount: true });
    }
  };

  showMe = () => {
    this.setState({ me: true, login: false, createAccount: false });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header" />
        {this.state.login ? (
          <Login showMe={this.showMe} togglelogin={this.togglelogin} />
        ) : null}
        {this.state.createAccount ? (
          <AccountCreate togglelogin={this.togglelogin} />
        ) : null}
        {this.state.me ? <UserComponent /> : null}
      </div>
    );
  }
}

export default App;
