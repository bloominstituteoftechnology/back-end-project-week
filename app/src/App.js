import React, { Component } from 'react';
import { connect } from 'react-redux';
import logout from './actions';

import Header from './components/display/header';
import StatusBar from './components/display/statusBar';
import Notes  from'./components/display/notes';
import Line from './components/display/line';

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
