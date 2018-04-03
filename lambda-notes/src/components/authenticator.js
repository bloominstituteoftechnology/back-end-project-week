import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Authenticator extends Component {
  getLinks() {
    if (this.props.authenticated) {
      return (
        <li>
          <NavLink to="/signout">Sign Out</NavLink>
        </li>
      );
    }
    return [
      <li key={1}>
        <NavLink to="/signin">Sign In</NavLink>
      </li>,
      <li key={2}>
        <NavLink activeClassName="hideTitle" to="/signup">Sign Up</NavLink>
      </li>
    ];
  }

  render() {
    return (
      <div>
        <NavLink to="/">You Must Sign In To Save Your Notes</NavLink>
        <ul>{this.getLinks()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(Authenticator);