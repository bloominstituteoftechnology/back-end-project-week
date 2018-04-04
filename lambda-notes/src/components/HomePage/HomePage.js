import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
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
        Welcome to LambdaNotes!
      </div>
    </div>
  )
}

export default HomePage;