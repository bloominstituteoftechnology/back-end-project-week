import React, { Component } from 'react';
import logo from '../logo.svg';
import NoteForm from './NoteForm';
import Notes from './Notes.js';
import '../styles/App.css';
import { connect } from 'react-redux';
import { getNotes } from '../actions';


class App extends Component {
  componentDidMount() {
    this.props.getNotes();
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="app__title">Noter</h1>
          <NoteForm />
        </header>
        {this.props.fetchingNotes ? (
          <img src={logo} className="App-logo" alt="logo" />
        ) : (
          <Notes notes={ this.props.notes } />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { notesReducer } = state;
  return {
    notes: notesReducer.notes,
    fetchingNotes: notesReducer.fetchingNotes,
    error: notesReducer.error
  };
};

export default connect(mapStateToProps, { getNotes })(App);