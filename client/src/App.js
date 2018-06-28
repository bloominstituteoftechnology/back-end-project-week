import React, { Component } from 'react';
import Home from './components/Home/Home';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/' component={Home} />
      </div>
    );
  }
}

export default withRouter(connect(null)(App));
