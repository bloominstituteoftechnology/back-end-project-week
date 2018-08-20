import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import axios from 'axios'


import NotesList from './components/NotesList.js'
import Sidebar from './components/Sidebar.js'
import CreateNote from './components/CreateNote.js'
import Note from './components/Note.js'



class App extends Component {
  constructor() {
    super(),
    this.state = {
      notes: [],
      newNoteTitle: "",
      newNoteTopic: "",
      newNoteText: ""
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addNote = e => {
    let note = {
      title: this.state.newNoteTitle,
      topic: this.state.newNoteTopic,
      text: this.state.newNoteText
    }

    axios
      .post('')
    this.props.history.push('/')
  }

  componentDidMount() {
    let localData = localStorage.getObj('l-notes-storage-bin')
    if (localData === null) {
      localStorage.setObj('l-notes-storage-bin', [
        {
          id: 0,
          title: "Welcome to L Notes",
          topic: "Click Me!",
          text: "Welcome to L Notes. This is a note taking app created as a project with Lambda School. The buttons on the left will take you to your notes list, or to a new note creator. When you create a new note and save, it will be available on your NotesList for review, editing or for you to delete. When you view a note as you are now, the edit and delete options are at the top right of the note. All data is saved to your browsers local storage, and not online, so your notes are yours alone. Though, this also means you cannot access them from another computer, but they will remain on this site even if you close the window. Thank you for using L Notes. Have fun!",
          time: 'N/A'
        }
      ]);
      localStorage.setItem('l-notes-id-logger', 1)
      window.location.reload();
    } else {
      this.setState({notes: localData})
    }
  }

  render() {

    const values = {
      title: this.state.newNoteTitle,
      topic: this.state.newNoteTopic,
      text: this.state.newNoteText
    }

    return (
      <div className="App">
        <Sidebar />
        <Route exact path="/" render={props => <NotesList {...props} notes={this.state.notes} />} />
        <Route path="/add-note" render={props => <CreateNote {...props} addNote={this.addNote} eHandler={this.handleInputChange} values={values} />} />
        <Route path="/notes/:id" render={props => <Note {...props} notes={this.state.notes} />} />
      </div>
    );
  }
}

export default App;
