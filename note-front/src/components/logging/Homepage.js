import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Homepage extends Component {
  getLinks() {
    console.log("props", this.props);
    if (this.props.authenticated) {
      return (
        <Link to="/signout">
          <button className="front__buttons">Sign Out</button>
        </Link>
      );
    }
    return (
      <header>
          <h1>Welcome!</h1>
          <div>
          <Link to="/login">
            <button>Log In</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      </header>
    );
  }

  render() {
    return (
      <div className="front__header">
        <Link className="front__link-header" to="/">
          Notes Homepage
        </Link>
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
