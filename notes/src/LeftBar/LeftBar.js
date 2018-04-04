import React from 'react';
import { Link } from 'react-router-dom';
import './LeftBar.css';

export const LeftBar = props => {
  const displayLogoutOrRegister = () => {
    if (sessionStorage.getItem('id'))
      return (
        <Link to="/logout">
          <button className="left-bar_button">Logout</button>
        </Link>
      );
    else
      return [
        <Link key={0} to="/login">
          <button className="left-bar_button">Login</button>
        </Link>,
        <Link key={1} to="/register">
          <button className="left-bar_button">Register</button>
        </Link>,
      ];
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
        {displayLogoutOrRegister()}
      </div>
    </div>
  );
};

export default LeftBar;
