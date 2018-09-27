// https://github.com/LambdaSchool/back-end-project-week/pull/343


import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import Menu from './components/Menu/Menu.js';
import Landing from './components/Landing/Landing.js';
import NewNoteForm from './components/Forms/NewNoteForm.js';
import NoteList from './components/NoteList/NoteList.js';
import Login from './components/Login/Login.js';
import FakeNoteItems from './components/NoteList/FakeNotes.js';
import Note from './components/Note/Note.js';
import Handshake from './utilities/handshake.js';

const URL = `http://localhost:8888/notes`;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      notes: null,
    };
  }

  componentDidMount(){   
    
  }

  getNotesFromDB = async (URL) => {
    axios
      .get(URL)
      .then(res => {
        this.setState({ notes: res.data });
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
      });
  }

  handleNewNote = (input) => {
    console.log(input);
    
    axios
      .post(URL, input)
      .then(res => {
        console.log('response in app.js', res.data);
        
        this.setState({ notes: res.data });
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
      });
    // input.id = this.state.notes.length;
    // let notes = this.state.notes.slice();
    // notes.push(input);
    // this.setState({ notes: notes });
  }

  handleDeleteNote = (input) => {
    input.id = this.state.notes.length;
    let notes = this.state.notes.slice();
    notes.push(input);
    this.setState({ notes: notes });
  }

  handleEditNote = (note) => {
    let index = this.findNoteIndex(note.id, this.state.notes);
    let notes = this.state.notes.slice();
    notes[index] = note;
    this.setState({
      notes: notes,
    })
  }

  handleLandingUpwardAnimation = () =>{

  }

  render() {
    return (
      <div className="App">
      {/* <Landing/> */}
        <Route exact path="/" component={Landing} />
        <Route path="/menu" component={Menu} />
        {/* <Route path="/newnote" component={NewNoteForm} /> */}
        <Route path="/newnote" render={props => { return <NewNoteForm handleNewNote={this.handleNewNote} notes={this.state.notes} /> }} />
        <Route path="/notelist" render={(props) => { return <NoteList notes={this.state.notes} /> }}/>
        <Route path="/login" component={Login} />
        <Route path="/noteview/:id" render={(props) => { return <Note {...props} notes={this.state.notes} delete={this.handleDeleteNote} edit={this.handleEditNote} /> }} />
      </div>
    );
  }
}

export default App;
