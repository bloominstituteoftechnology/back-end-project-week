import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/SideBar.css';
import { logout } from '../actions';

class SideBar extends Component {

  handleClick = e => {
    localStorage.removeItem('token');
    this.props.logout();
  }

  render() {
    return (
      <div className="sideBar">
        <div className="sideBar-header">Lambda Notes</div>
        <div className="sideBar-buttons">
          <Link to="/home">
            <button className="sideBar-button">View Your Notes</button>
          </Link>
          <Link to="/create-new-note">
            <button className="sideBar-button">+ Create New Note</button>
          </Link>
          <Link to="/">
            <button className="sideBar-button" onClick={this.handleClick}>Logout</button>
          </Link>
        </div>
      </div>
    );
  };
};

export default connect(null, { logout })(SideBar);