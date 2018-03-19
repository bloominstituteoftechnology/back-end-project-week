import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route, Redirect, withRouter} from 'react-router-dom';

import ViewNotes from './ViewNotes';
import Navigation from './Navigation';
import LogIn from './LogIn';

class App extends Component {
 
  render() {
    const App = () => {
      return (
      <div className='App'>
        <Navigation />
        <ViewNotes  />
      </div>
      );
    }
    return (
      <div>
        <Route path='/notes' component={App} />
        <Route exact path='/' render={() => (
          this.props.loggedIn ? (
            <Redirect to='/notes' />
          ) : (<LogIn />)  
        )} />
        <Route path='/notes' render={() => (
          this.props.loggedOut ? (
            <Redirect to='/' />
          ) : <Route to='/notes' />  
        )} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    loggedOut: state.loggedOut
  }
}

export default withRouter(connect(mapStateToProps)(App));
