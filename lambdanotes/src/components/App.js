import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Sidebar from './Sidebar';
import NoteList from './NoteList';
import CreateNote from './CreateNote';
import NoteView from './NoteView';
import EditNote from './EditNote';

import './App.css';

export default class App extends React.Component {
  nextId = 0;
  noteIndex = 0;

  state = {
    notes: [],
  };

  handleNoteViewIndex = inputId => {
    for (let i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i].id === inputId) this.noteIndex = i;
    };
  };

  handleCreateNote = inputNote => {
    const newNote = {
      id: this.nextId++,
      title: inputNote.title,
      body: inputNote.body,
    };
    const newNotes = [...this.state.notes, newNote];
    this.setState({
      notes: newNotes,
    });
  };

  handleEditNote = inputNote => {
    const editedNote = {
      id: inputNote.id,
      title: inputNote.title,
      body: inputNote.body,
    };
    const editedNotes = [...this.state.notes];
    editedNotes.splice(this.noteIndex, 1, editedNote);
    this.setState({
      notes: editedNotes,
    });
  };

  handleDeleteNote = inputId => {
    const lessNotes = this.state.notes.filter(note => note.id !== inputId);
    this.setState({
      notes: lessNotes,
    });
  };

  updateSortedNotes = sortedNotes => {
    this.setState({
      notes: sortedNotes,
    });
  };


  render() {
    return (
      <Router>
        <div className="App">
          {this.state.authenticated ? (<Sidebar />) : null}
          <Route exact path={"/signup"} render={() => <SignUp handleNewUser={this.handleNewUser}/>} />
          <Route exact path={"/"} render={() => (this.state.authenticated ? (<NoteList notes={this.state.notes} handleNoteViewIndex={this.handleNoteViewIndex} updateSortedNotes={this.updateSortedNotes} />) : (<SignIn />))} />
          <Route exact path={"/create"} render={() => (this.state.authenticated ? (<CreateNote createNote={this.handleCreateNote} />) : (<SignIn />))} />
          <Route exact path={"/view"} render={() => (this.state.authenticated ? (<NoteView note={this.state.notes[this.noteIndex]} toggleModal={this.toggleModal} handleDeleteNote={this.handleDeleteNote} />) : (<SignIn />))} />
          <Route exact path={"/edit"} render={() => (this.state.authenticated ? (<EditNote note={this.state.notes[this.noteIndex]} handleEditNote={this.handleEditNote} />) : (<SignIn />))} />
        </div>
      </Router>
    );
  };
}
