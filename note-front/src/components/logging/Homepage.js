import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../styles/Login.css";

class Homepage extends Component {
  getLinks() {
    if (this.props.authenticated) {
      return (
        <header>
          <h1>Note App</h1>
          <div>
            <Link to="/signout">
              <button className="front__buttons">Sign Out</button>
            </Link>
          </div>
        </header>
      );
    }
    return (
      <header>
        <h1>Note App</h1>
        <div>
          <Link to="/login">
            <button className="front__buttons">Log In</button>
          </Link>
          <Link to="/register">
            <button className="front__buttons">Register</button>
          </Link>
        </div>
      </header>
    );
  }

  render() {
    return (
      <div className="front__header">
        <div>{this.getLinks()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(Homepage);
