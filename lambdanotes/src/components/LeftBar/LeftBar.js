/* eslint-disable */

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Switch,
} from 'react-router-dom';
import AllNotes from '../AllNotes/AllNotes';
import CreateNotes from '../CreateNotes/CreateNotes';
import ViewNote from '../ViewNote/ViewNote';
import '../../App.css';

class LeftBar extends Component {
  render() {
    return (
          <div className="sidebar">
            <h1 className="title">Lambda Notes</h1>
            <Link to="/" exact>
              <button className="button">View Your Notes</button>
            </Link>
            <Link to="/create">
              <button className="button">+ Create New Note</button>
            </Link>
          </div>
    );
  }
}

export default LeftBar;
