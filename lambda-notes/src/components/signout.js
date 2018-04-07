
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions';
import { NavLink } from 'react-router-dom';

class SignOut extends Component {
  componentWillMount() {
    this.props.logout();
  }
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
      <div className="logout">
        <div className="logout--message">You have signed out</div>
        <div className="links">
          <ul>{this.getLinks()}</ul>
        </div>
      </div>
    );
  };
};

export default connect(null, { logout })(SignOut);