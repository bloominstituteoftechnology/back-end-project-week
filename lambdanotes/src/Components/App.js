import React, { Component } from 'react';
import './App.css';
import { getNote, createNote } from './actions/index';
import { connect } from 'react-redux';
import NewNote from './newNote/newNote';
import SideBar from './sideBar/sideBar';
import NoteList from './note/noteList';
import { Route } from 'react-router-dom'
import Notes from './note/notes'
import EditNote from './newNote/editNote'

class App extends Component {

  render() {
    return (
      <div className="App">
      <NewNote />
      <NoteList />
      {/* <Route exactpath='/' component={SideBar} />
      <Route path="/newnote" component={NewNote}/>
      <Route path='/notelist' component={NoteList}/>
      <Route path='/note' component={Notes} />
      <Route path="/editnote" component={EditNote} /> */}
      </div>
    );
  }
}

export default App;
