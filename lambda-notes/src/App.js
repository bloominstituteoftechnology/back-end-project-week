import React, { Component } from 'react';
import './App.css';

import NavBar from './NavBar/NavBar';
import CreateNote from './CreateNote/CreateNote';
import EditNote from './EditNote/EditNote';
import NotesList from './NotesList/NotesList';
import ExpandedNote from './ExpandedNote/ExpendedNote';

import {Route} from 'react-router-dom';
import styled from 'styled-components'

import axios from 'axios';




class App extends Component {
  state = {
    notes : []
  }

  fetchNotes = () =>{
    axios 
      .get('http://localhost:3100/notes')
        .then(response =>{
          this.setState(() =>({notes: response.data}));
        })

  }

  componentDidMount(){
    this.fetchNotes();
  }

  render() {
    return (
      
      <div className = 'App'>
        <NavBar/>
        <Route exact path = '/' render = {(props) => < NotesList {...props} notes = {this.state.notes}/>}/>
        <Route exact path = '/create' render = {(props) => < CreateNote {...props}/>}/>
        <Route exact path = '/edit' render = {(props) => < EditNote {...props}/>}/>
        <Route exact path = '/notes/:id' render = {(props) => < ExpandedNote {...props}/>}/>
      </div>
    );
  }
}

export default App;
