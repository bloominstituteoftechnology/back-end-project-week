import React, { Component } from 'react';
import './App.css';

import NavBar from './NavBar/NavBar';
import CreateNote from './CreateNote/CreateNote';
import EditNote from './EditNote/EditNote';
import NotesList from './NotesList/NotesList';
import ExpandedNote from './ExpandedNote/ExpandedNote';

import {Route} from 'react-router-dom';
import styled from 'styled-components'

import axios from 'axios';





class App extends Component {
  state = {
    notes : []
  }

  fetchNotes = () =>{
    axios 
      .get('https://chillington-notes-app.herokuapp.com/notes')
        .then(response =>{
          this.setState(() =>({notes: response.data}));
        })

  }
  componentDidMount(){
    this.fetchNotes();
  }

  updateNote = (updatedNote) =>{
    console.log(updatedNote.title);
    axios
      .put(`https://chillington-notes-app.herokuapp.com/notes/${updatedNote.note.id}`, {title: updatedNote.title, content: updatedNote.content})
        .then(response =>{
          this.fetchNotes()
        })
        .catch(() =>{
          console.log('Sorry, failecd to update note')
        })
    
  }

  createNote = (newNote) =>{
    axios
      .post('https://chillington-notes-app.herokuapp.com/notes', newNote)
        .then(response =>{
          this.fetchNotes()
        })
        .catch(() =>{
          console.log('Could not add new note')
        })
  }

  deleteNote = (id) =>{
    axios 
      .delete(`https://chillington-notes-app.herokuapp.com/notes/${id}`)
        .then(response =>{
          this.fetchNotes()
        })
        .catch(() =>{
          console.log('Could not delete note with specified id')
        })
        
  }

  render() {
    return (
      
      <div className = 'App'>
        <NavBar/>
        <Route exact path = '/' render = {(props) => < NotesList {...props} notes = {this.state.notes}/>}/>
        <Route exact path = '/create' render = {(props) => < CreateNote {...props} notes = {this.state.notes} createNote = {this.createNote}/>}/>
        <Route exact path = '/edit/:id' render = {(props) => < EditNote {...props} notes = {this.state.notes} updateNote = {this.updateNote}/>}/>
        <Route exact path = '/notes/:id' render = {(props) => < ExpandedNote {...props} notes = {this.state.notes} deleteNote = {this.deleteNote} fetchNote = {this.fetchNoteById}/>}/>
      </div>
    );
  }
}

export default App;
