import React from 'react';
import { Link } from 'react-router-dom';

import './Sidebar.css';

export default class Sidebar extends React.Component {
  logout = _ => {
    localStorage.clear('token');
    this.props.deauthenticate();
  };

  render() {
    return (
      <div className="Sidebar">
          <h1 className="Sidebar-Title">Lambda Notes</h1>
          <Link to={"/"}><button type="button">View Your Notes</button></Link>
          <Link to={"/create"}><button type="button">+ Create New Note</button></Link>
          <p className="Sidebar-Logout" onClick={this.logout}>Logout</p>
      </div>
    );
  };
};
