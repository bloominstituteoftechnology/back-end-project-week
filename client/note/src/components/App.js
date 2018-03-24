import React, { Component } from 'react';
import './App.css';
import NoteForm from './NoteForm';
import NoteContainer from './NoteContainer';
import { getNotes, loggedOut } from '../actions';
import { connect } from 'react-redux';
import LogIn from './LogIn';
import { stayLoggedIn } from '../actions';

class App extends Component {
  componentWillMount() {
    if (window.localStorage.getItem('token')) {
      this.props.stayLoggedIn();
    }
  }

  render() {
    return (
      <div className="App">
        {this.props.loggedIn ? null : <LogIn />}
        {this.props.loggedIn ? (
          <div className="NotesLoggedIn">
            <button id="LogOutButton" onClick={this.props.loggedOut}>Log Out</button>
            <h1>{window.localStorage.getItem('username')}'s Notes</h1>
            <NoteForm />
            <NoteContainer notes={this.props.notes} />
          </div>
        ) : null}
      </div>
    );
  }
}

App.defaultProps = {
  notes: []
};


const MapStateToProps = state => {
  const { noteReducer } = state;
  return {
    notes: noteReducer.notes,
    error: noteReducer.error,
    fetchingNotes: noteReducer.fetchingNotes,
    loggedIn: noteReducer.loggedIn,
    loggedOut: noteReducer.loggedOut
  };
};

export default connect(MapStateToProps, { getNotes, stayLoggedIn, loggedOut })(App);
