// dependencies
import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import firebase from './firebase';

// axios.defaults.withCredentials = true;

// Components
import Sidebar from './components/sidebar';
import NotesList from './components/notes-list';
import CreateNote from './components/create-note';
import NoteDetails from './components/note-details';
import EditNote from './components/edit-note';
import DeleteModal from './components/delete-modal';
import Signup from './components/signup';
import Login from './components/login';

import './App.css';

// Styles for App Component
const AppStyled = styled.div`
  display: flex;
  flex-flow: row no-wrap;
  height: auto;

  .Content {
    height: 80%;
    width: 100%;
  }
`;

// App Component starts here
class App extends Component {
  state = {
    showingSignup: true,
    showingLogin: false,
    viewingNotes: true,
    creatingNote: false,
    editingNote: false,
    showingNoteDetails: false,
    authenticated: false,
    username: '',
    notes: [],
    noteDetails: {
      title: '',
      content: '',
      _id: ''
    }
  };

  // componentDidMount() {
  //   const notesRef = firebase.database().ref('notes');
  //   notesRef.on('value', snapshot => {
  //     let notes = snapshot.val();
  //     let newState = [];
  //     for (let note in notes) {
  //       newState.push({
  //         // id: notes[note].id,
  //         id: note,
  //         title: notes[note].title,
  //         content: notes[note].content
  //       });
  //     }
  //     this.setState({ notes: newState });
  //   });
  // }

  loginUser = userInfo => {
    console.log(`${userInfo.username} just logged in`);
    axios
      .post('http://localhost:5000/login', userInfo)
      .then(res => {
        localStorage.setItem('token', res.data.token);
      })
      .then(() => {
        this.setState({ authenticated: true, username: userInfo.username });
      })
      .then(() => {
        this.getNotes();
      })
      .catch(err => {
        console.log(err);
      });
  };

  logoutUser = () => {
    localStorage.removeItem('token');
    this.setState({
      authenticated: false,
      showLogin: true,
      showSignup: false
    });
  };

  showLogin = () => {
    this.setState({
      showingLogin: true,
      showingSignup: false
    });
  };

  showSignup = () => {
    this.setState({
      showingSignup: true,
      showingLogin: false
    });
  };

  getNotes = () => {
    const token = localStorage.getItem('token');
    const header = { headers: { Authorization: token } };
    axios
      .get(`http://localhost:5000/users/name/${this.state.username}`, header)
      .then(res => {
        this.setState({ notes: res.data.notes });
        console.log(this.state.username);
      })
      .catch(err => console.log(err));
  };

  viewNotes = () => {
    this.setState({
      viewingNotes: true,
      creatingNote: false,
      showingNoteDetails: false,
      editingNote: false,
      deletingNote: false
    });
  };

  createNewNoteForm = () => {
    this.setState({
      viewingNotes: false,
      creatingNote: true,
      showingNoteDetails: false,
      editingNote: false,
      deletingNote: false
    });
  };

  showNoteDetails = id => {
    const noteToView = this.state.notes.find(note => note._id === id);
    this.setState({
      noteDetails: { ...noteToView },
      viewingNotes: false,
      creatingNote: false,
      showingNoteDetails: true,
      editingNote: false,
      deletingNote: false
    });
  };

  showNoteEditForm = () => {
    this.setState({
      viewingNotes: false,
      creatingNote: false,
      showingNoteDetails: false,
      editingNote: true,
      deletingNote: false
    });
  };

  showDeleteModal = () => {
    this.setState({
      deletingNote: true
    });
  };

  closeDeleteModal = () => {
    this.setState({
      deletingNote: false
    });
  };

  saveNewNote = note => {
    const notesRef = firebase.database().ref('notes');
    notesRef.push(note);
    this.viewNotes();
  };

  updateNote = updatedNote => {
    this.setState({ noteDetails: updatedNote });
    let notesRef = firebase.database().ref(`/notes/${updatedNote.id}`);
    notesRef.update(updatedNote).then(() => {
      this.showNoteDetails(updatedNote.id);
    });
  };

  getNextId = () => {
    if (this.state.notes.length === 0) return 0;
    else {
      let lastNoteIndex = this.state.notes.length - 1;
      let lastNote = this.state.notes[lastNoteIndex];
      let nextId = lastNote.id + 1;
      return nextId;
    }
  };

  deleteNote = () => {
    let id = this.state.noteDetails.id;
    console.log(id);
    const notesRef = firebase.database().ref(`/notes/${id}`);
    notesRef.remove();
    // let updatedNotes = this.state.notes.filter(note => note.id !== this.state.noteDetails.id);
    // this.setState({ notes: updatedNotes });
    this.viewNotes();
  };

  render() {
    return (
      <AppStyled className="App">
        <Sidebar
          viewNotes={this.viewNotes}
          createNewNoteForm={this.createNewNoteForm}
          authenticated={this.state.authenticated}
          showingLogin={this.state.showingLogin}
          showingSignup={this.state.showingSignup}
          showLogin={this.showLogin}
          showSignup={this.showSignup}
          logoutUser={this.logoutUser}
        />

        <div className="Content">
          {!this.state.authenticated &&
            this.state.showingLogin && <Login loginUser={this.loginUser} />}

          {!this.state.authenticated &&
            this.state.showingSignup && <Signup showLogin={this.showLogin} />}

          {this.state.authenticated &&
            this.state.viewingNotes &&
            this.state.notes.length > 0 && (
              <NotesList
                notes={this.state.notes}
                showNoteDetails={this.showNoteDetails}
              />
            )}

          {this.state.authenticated &&
            this.state.creatingNote && (
              <CreateNote
                getNextId={this.getNextId}
                saveNewNote={this.saveNewNote}
              />
            )}

          {this.state.authenticated &&
            this.state.showingNoteDetails && (
              <NoteDetails
                noteDetails={this.state.noteDetails}
                showNoteEditForm={this.showNoteEditForm}
                showDeleteModal={this.showDeleteModal}
                style={{ padding: '0' }}
              />
            )}

          {this.state.authenticated &&
            this.state.editingNote && (
              <EditNote
                noteDetails={this.state.noteDetails}
                updateNote={this.updateNote}
                showNoteEditForm={this.showNoteEditForm}
                showNoteDetails={this.showNoteDetails}
              />
            )}
        </div>
        {this.state.authenticated &&
          this.state.deletingNote && (
            <DeleteModal
              deleteNote={this.deleteNote}
              closeDeleteModal={this.closeDeleteModal}
            />
          )}
      </AppStyled>
    );
  }
} // App Component ends here

export default App;
