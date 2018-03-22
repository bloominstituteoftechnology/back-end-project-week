import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Navbar from './components/Navbar';
import Note from './components/notes/noteMain';
import * as actions from './actions/index';

class App extends Component {
  constructor() {
    super();
  };

  componentDidMount() {
    this.props.dispatch(actions.initializationRequests());
  };

  render() {
    return (
      <div>
        <Navbar />
        <Note />
      </div>
    );
  };
};

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(App);