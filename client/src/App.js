import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import Menu from './components/Menu/Menu.js';
import Landing from './components/Landing/Landing.js';
import NewNoteForm from './components/Forms/NewNoteForm.js';
import NoteList from './components/NoteList/NoteList.js';
import Login from './components/Login/Login.js';
import FakeNoteItems from './components/NoteList/FakeNotes.js';
import Note from './components/Note/Note.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      notes: FakeNoteItems
    };
  }

  componentDidMount(){

  }

  handleCreateNote = () => {

  }

  handleDeleteNote = () => {

  }

  handleLandingUpwardAnimation = () =>{

  }

  render() {
    return (
      <div className="App">
      {/* <Landing/> */}
        <Route exact path="/" component={Landing} />
        <Route path="/menu" component={Menu} />
        <Route path="/newnote" component={NewNoteForm} />
        <Route path="/notelist" render={(props) => { return <NoteList notes={this.state.notes} /> }}/>
        <Route path="/login" component={Login} />
        <Route path="/noteview/:id" render={(props) => { return <Note {...props} notes={this.state.notes} delete={this.handleDeleteNote} edit={this.handleEditNote} /> }} />
      </div>
    );
  }
}

export default App;
