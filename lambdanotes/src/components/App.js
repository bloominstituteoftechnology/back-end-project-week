import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Sidebar from './Sidebar';
import NoteList from './NoteList';
import CreateNote from './CreateNote';
import NoteView from './NoteView';
import EditNote from './EditNote';

import './App.css';

const ROOT_URL = 'http://localhost:5000/api';

export default class App extends React.Component {
  nextId = 0;
  noteIndex = 0;

  state = {
    notes: [],
    authenticated: false,
  };

  async componentDidMount() {
    if (localStorage.getItem('token')) {
      await this.getNotes();
      return this.setState({
        authenticated: true,
      });
    }
    return this.setState({
      authenticated: false,
    });
  };

  authenticate = _ => {
    this.setState({
      authenticated: true,
    });
  };

  deauthenticate = _ => {
    this.setState({
      authenticated: false,
      notes: [],
    });
  };

  handleNoteViewIndex = inputId => {
    for (let i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i]._id === inputId) this.noteIndex = i;
    };
  };

  getNotes = async _ => {
    try {
      const res = await axios.get(`${ROOT_URL}/notes`, {
        headers: {
          Authorization: localStorage.getItem('token'),
          uuID: localStorage.getItem('uuID'),
        },
      });
      console.log(res.data.allNotes);
      this.setState({
        notes: res.data.allNotes,
      });
    } catch (err) {
      return console.log(err);
    };
  };

  handleCreateNote = async inputNote => {
    const newNote = {
      author: localStorage.getItem('uuID'),
      title: inputNote.title,
      body: inputNote.body,
    };
    try {
      await axios.post(`${ROOT_URL}/notes`, newNote);
    } catch (err) {
      return console.error(err);
    };
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

  renderSignIn = _ => {
    return <SignIn login={this.login} ROOT_URL={ROOT_URL} axios={axios} authenticate={this.authenticate}/>
  };

  render() {
    return (
      <Router>
        <div className="App">
          {this.state.authenticated ? (<Sidebar deauthenticate={this.deauthenticate} />) : null}
          <Route exact path={"/signup"} render={() => <SignUp ROOT_URL={ROOT_URL} axios={axios} />} />
          <Route exact path={"/"} render={() => (this.state.authenticated ? (<NoteList notes={this.state.notes} handleNoteViewIndex={this.handleNoteViewIndex} updateSortedNotes={this.updateSortedNotes} />) : (this.renderSignIn()))} />
          <Route exact path={"/create"} render={() => (this.state.authenticated ? (<CreateNote createNote={this.handleCreateNote} />) : (this.renderSignIn()))} />
          <Route exact path={"/view"} render={() => (this.state.authenticated ? (<NoteView note={this.state.notes[this.noteIndex]} toggleModal={this.toggleModal} handleDeleteNote={this.handleDeleteNote} />) : (this.renderSignIn()))} />
          <Route exact path={"/edit"} render={() => (this.state.authenticated ? (<EditNote note={this.state.notes[this.noteIndex]} handleEditNote={this.handleEditNote} />) : (this.renderSignIn()))} />
        </div>
      </Router>
    );
  };
}
