import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import Login from './Login';

const Sidebar = props => {
  return (
    <div className="Sidebar">
      <h1 className="Sidebar-Title">Lambda Notes</h1>
      <Link to={'/login'}>
        <button type="button">Login</button>
      </Link>
      <Link to={'/'}>
        <button type="button">View Your Notes</button>
      </Link>
      <Link to={'/create'}>
        <button type="button">+ Create New Note</button>
      </Link>
    </div>
  );
};

export default Sidebar;
