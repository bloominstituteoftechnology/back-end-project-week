import React from 'react';
import { Link } from 'react-router-dom';
import './LeftBar.css';

export const LeftBar = props => {
  const displayLogout = () => {
    if (sessionStorage.getItem('id'))
      return (
        <Link to="/logout">
          <button className="left-bar_button">Logout</button>
        </Link>
      );
  };

  return (
    <div className="left-bar">
      <div className="left-bar_header">Lambda Notes</div>
      <div className="left-bar_buttons">
        <Link to="/">
          <button className="left-bar_button">View Your Notes</button>
        </Link>
        <Link to="/new-note">
          <button className="left-bar_button">+ Create New Note</button>
        </Link>
        {displayLogout()}
      </div>
    </div>
  );
};

export default LeftBar;
