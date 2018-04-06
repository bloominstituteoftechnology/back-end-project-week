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
      !this.props.authenticated ?
        <div className="popup">
          <div className="popup__inner">
            <ul>{this.getLinks()}</ul>
          </div>
        </div> :
      <div className="auth-links">
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
