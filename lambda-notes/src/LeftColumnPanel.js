import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LeftColumnPanel.css';
 
class LeftColumnPanel extends Component {
  render() {
    return (
    <div className="LeftColumnPanel">
      <p>
        Lambda
        <br /> 
        Notes
      </p>
      <Link to="/viewnotes">
        <div className="view-button button">View Your Notes</div>
      </Link>
      <Link to="/createnote">
        <div className="create-button button">+ Create New Note</div>
      </Link>
    </div>
    );
  } 
};

export default LeftColumnPanel;
