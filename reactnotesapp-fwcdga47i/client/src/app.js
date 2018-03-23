import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from './actions';

import Header from './components/app/header';
import StatusBar from './components/app/statusBar';
import Line from './components/app/line';
import Notes from './components/notes/notes';

class App extends Component {
  signOutHandler = _ => {
    this.props.logout(this.props.history);
  };

  render() {
    return (
      <div className="App">
        <Header />

        <StatusBar history={this.props.history} />

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
