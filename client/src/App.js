// https://github.com/LambdaSchool/back-end-project-week/pull/343


import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Menu from './components/Menu/Menu.js';
import Landing from './components/Landing/Landing.js';
import NewNoteForm from './components/Forms/NewNoteForm.js';
import NoteList from './components/NoteList/NoteList.js';
import Login from './components/Login/Login.js';
import FakeNoteItems from './components/NoteList/FakeNotes.js';
import Note from './components/Note/Note.js';
import Handshake from './utilities/handshake.js';
import EditNoteForm from './components/Forms/EditNoteForm.js';

const URL = `http://localhost:8888/notes`;

const AppContainer = styled.div`
   width:420px;
  height:605px;
  margin:0 auto;
  background-color: #342D33;
  color: #E3FFD5;
`;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      notes: null,
    };
  }

  componentDidMount(){   
    axios
      .get(URL)
      .then(res => {
        this.setState({ notes: res.data });
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
      });
  }

  findNoteIndex = (noteId, arr) => {
    let index = arr.findIndex((el, i) => {
      return el.id === noteId;
    })
    return index;
  }

  setNotes = async (URL) => {
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
    axios
      .post(URL, input)
      .then(res => {
        let nu = res.data;
        this.setState({ notes: nu });
        this.setNotes();
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
      });
  }

  handleDeleteNote = (input) => {
    console.log('id of to be deleted',input);
    axios
      .delete(URL+`/${input}`)
      .then(res => {
        this.setState({ notes: res.data });
        this.setNotes();
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
      });
  }

  handleEditNote = (note) => {
    axios
      .put(URL+`/${note.id}`, {id:note.id, title:note.title, content:note.content})
      .then(res => {
        console.log('res from PUT', res.data);
        
        this.setState({ notes: res.data });
        this.setNotes();
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
      })
  }

  render() {
    return (
      <AppContainer>
      {/* <Landing/> */}
        <Route exact path="/" component={Landing} />
        <Route path="/menu" component={Menu} />
        <Route path="/editnote/:id" render={(props) => { return <EditNoteForm {...props} handleEditNote={this.handleEditNote} notes={this.state.notes} /> }} />
        <Route path="/newnote" render={(props) => { return <NewNoteForm  {...props} handleNewNote={this.handleNewNote} notes={this.state.notes} /> }} />
        <Route path="/notelist" render={(props) => { return <NoteList {...props} notes={this.state.notes}/> }}/>
        <Route path="/login" component={Login} />
        <Route path="/noteview/:id" render={(props) => { return <Note {...props} notes={this.state.notes} delete={this.handleDeleteNote} edit={this.handleEditNote} /> }} />
        </AppContainer>
    );
  }
}

export default App;
