import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import SideNav from './SideNav/SideNav';
import NewNote from './Notes/NewNote';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <SideNav>
          <Route path="/api" component={ SideNav }></Route>
          <Route path="/api/NewNote" component={ NewNote }></Route>
        </SideNav>
      </div>
    );
  }
}

export default withRouter(App);