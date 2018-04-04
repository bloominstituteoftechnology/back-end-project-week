import React from 'react';
import './NotLoggedIn.css';
import { Link } from 'react-router-dom';

const NotLoggedIn = () => {
  return (
    <div className="HomePage-container">
      <nav className="Sidebar-container">
        <div className="Sidebar">
          <h1>Lambda Notes</h1>
          <div className="Sidebar-buttons">
          <Link to="/login">
            <button className="Sidebar-button" >
              Login
            </button>
          </Link>
          <Link to="/users">
            <button className="Sidebar-button">
                Register
            </button>
          </Link>
          </div>
        </div>
      </nav>
      <div className="HomePage-Text">
        Must Login to view this page!
        If you do not have an account, please register!
      </div>
    </div>
  )
}

export default NotLoggedIn;