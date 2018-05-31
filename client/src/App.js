import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import NoteList from "./components/NoteList";
import ViewNote from "./components/ViewNote";
import Edit from "./components/Edit";
import Create from "./components/Create";
import './App.css';
import axios from 'axios'; 


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      notes: []
    }

    this.editNote = this.editNote.bind(this)
  }

  update = () => {
    axios.get('https://boiling-wildwood-28100.herokuapp.com/notes')
    .then(response => {
      console.log(response);
      return this.setState({ notes: response.data })})
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.update();
  }
  

  deleteNote = id => {
    const newNotes = this.state.notes.filter(note => note.id !== Number(id));
    this.setState({notes: newNotes});
    console.log('from app -- delete', newNotes)

  }

  editNote = newNote => {
    console.log(newNote);
    let {notes} = this.state;
    const idx = notes.findIndex(el => el.id === newNote.id);
    notes.splice(idx,1, newNote);
    console.log('editNote state',notes)
    this.setState({notes: notes});
  }

  createNote = params => {
    const addNote = this.state.notes.slice().concat(params);
    this.setState({notes: addNote});


    console.log('from createNote params...', params);
    console.log('after created..state', this.state.notes)
  }

  generateId = () => {
    const len = this.state.notes.length + 1;
    return len;
  }


  render() {
    return (
      <div className="App">
        <div className="container0">
          <Navbar />
          <Route  exact path="/" render={() => <NoteList notes={this.state.notes} />} />
          <Route path="/create" render={props => <Create {...props} create={this.createNote} update={this.update}/>} />
          <Route path="/view/:id" render={props => <ViewNote {...props} notes={this.state.notes} delete={this.deleteNote}/>} />
          <Route path="/edit/:id" render={props => <Edit {...props} notes={this.state.notes} update={this.update}/>} />
        </div>
      </div>
    );
  }
}

export default App;
