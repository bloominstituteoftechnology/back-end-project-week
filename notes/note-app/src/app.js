import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from './actions';
// import { Redirect } from 'react-router-dom';

import Header from './components/app/header';
import StatusBar from './components/app/statusBar';
import Line from './components/app/line';
import Notes from './components/notes/notes';
// import AppLoggedIn from './AppLoggedIn';
// import NotLoggedIn from './NotLoggedIn';

// import logo from '../assets/logo.svg';

// import '../../styles/css/index.css';

class App extends Component {
  signOutHandler = _ => {
    this.props.logout(this.props.history);
  };

  render() {
    return (
      <div className="App">
        <Header />

        <StatusBar />

        <Line />

        <Notes history={this.props.history} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //
  };
};

export default connect(mapStateToProps, { logout })(App);
