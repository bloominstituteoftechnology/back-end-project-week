import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SideBar extends Component {
  getLinks() {
    if (this.props.authenticated) {
      return (
        <div className="sidebar">
          <h1 className="title">Lambda Notes</h1>
          <li key={1}>
            <Link to="/notelist">
              <button className="button button--teal">View Your Notes</button>
            </Link>
          </li>
          <li key={2}>
            <Link to="/noteform">
              <button className="button button--teal">+ Create New Note</button>
            </Link>
          </li>
          <li key={3}>
            <Link to="/signout">
              <button className="button button--teal">Sign Out</button>
            </Link>
          </li>
        </div>
      );
    }
    return (
      <div className="sidebar">
        <h1 className="title">Lambda Notes</h1>
        <li key={1}>
          <button className="button button--teal">
            <Link to="/login">Sign In</Link>
          </button>
        </li>
        <li key={2}>
          <button className="button button--teal">
            <Link to="/signup">Sign Up</Link>
          </button>
        </li>
      </div>
    );
  }

  render() {
    return (
      <div>
        <ul>{this.getLinks()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps)(SideBar);
