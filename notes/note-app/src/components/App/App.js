import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetError, signOut } from '../../actions';
import { Redirect } from 'react-router-dom';

import StatusBar from './StatusBar';
import AppLoggedIn from './AppLoggedIn';
// import NotLoggedIn from './NotLoggedIn';

// import logo from '../assets/logo.svg';

import '../../styles/css/index.css';

class App extends Component {
  state = {
    username: '',
  };

  componentDidMount() {
    this.resetError();
    this.setState({ username: this.props.match.params.username });
  }

  resetError = _ => {
    this.props.resetError();
  };

  signOutHandler = _ => {
    this.props.signOut(this.state.username);
  };

  //   <div className="AppNotLoggedIn">
  //   <NotLoggedIn />
  // </div>

  render() {
    return (
      <div className="App">
        <StatusBar
          appIsLoggedIn={this.props.isLoggedIn}
          signOutHandler={this.signOutHandler}
        />

        {this.props.isLoggedIn ? (
          <AppLoggedIn signOutHandler={this.state.signOutHandler} />
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, { resetError, signOut })(App);
