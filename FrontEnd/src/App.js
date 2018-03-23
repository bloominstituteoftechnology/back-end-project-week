import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Navbar from './components/Navbar/NavBar';
import Note from './components/notes/noteMain';
import * as actions from './actions/index';

class App extends React.Component {
  constructor() {
    super();
  };

  // componentDidMount() {
  //   this.props.dispatch(actions.initializationRequests());
  // };

  render() {
    return (
      <div>
        {/* <Navbar /> */}
        <Note />
      </div>
    );
  };
};

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(App);