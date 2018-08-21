import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'


import NotesList from './components/NotesList.js'
import Sidebar from './components/Sidebar.js'
import CreateNote from './components/CreateNote.js'
import Note from './components/Note.js'
import Signin from './components/auth/signin'
import Signup from './components/auth/signup'



class App extends Component {
  constructor() {
    // eslint-disable-next-line
    super(),
    this.state = {
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
      .post('Http://localhost:5000/api/notes', note)
      .then(response => {

      })
      .catch(error => {
        console.log(error.message)
      })
    this.props.history.push('/home')
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
        <Switch>
          <Route exact path="/" component= {Signin} />
          <Route path="/signup" component= {Signup} />
          <Route path="/home" render={props => <NotesList {...props}  />} />
          <Route path="/add-note" render={props => <CreateNote {...props} addNote={this.addNote} eHandler={this.handleInputChange} values={values} />} />
          <Route path="/notes/:id" render={props => <Note {...props} />} />
          <Route component={Signin} />
        </Switch>
      </div>
    );
  }
}

export default App;
