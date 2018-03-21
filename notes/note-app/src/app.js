import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from './actions';
// import { Redirect } from 'react-router-dom';

import Header from './components/app/header';
import StatusBar from './components/app/statusBar';
import Notes from './components/notes/notes';
// import AppLoggedIn from './AppLoggedIn';
// import NotLoggedIn from './NotLoggedIn';

// import logo from '../assets/logo.svg';

// import '../../styles/css/index.css';

class App extends Component {
  // state = {
  //   username: '',
  // };

  componentDidMount() {
    // this.resetError();
    // this.setState({ username: this.props.match.params.username });
  }

  // resetError = _ => {
  //   this.props.resetError();
  // };

  signOutHandler = _ => {
    this.props.logout(this.props.history);
  };

  //   <div className="AppNotLoggedIn">
  //   <NotLoggedIn />
  // </div>

  render() {
    return (
      <div className="App">
        <Header />

        <StatusBar signOutHandler={this.signOutHandler} />

        <Notes history={this.props.history} />

        {/* // {this.props.isLoggedIn ? ( */}
        {/* //   <AppLoggedIn signOutHandler={this.state.signOutHandler} /> */}
        {/* // ) : ( */}
        {/* //   <Redirect to="/" /> */}
        {/* // )} */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps, { logout })(App);
