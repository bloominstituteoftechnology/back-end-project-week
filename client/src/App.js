import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NewNoteForm from './components/Forms/NewNoteForm';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount(){

  }

  handleCreateNote = () => {

  }

  render() {
    return (
      <div className="App">
       {/* 
        - LOGO,
        - buttons: {
          --- "add new note",
          --- "notes",
          --- "login"
        }
        - copyright / "about" link
        */}
        <Link to="/newnote">Add New Note</Link>
        <Link to="/notelist">View Notes</Link>
        <Link to="login">Login</Link>
        <Route path="/newnote"{...rest} render={(props) => { <NewNoteForm {...props} /> }} />
        <Route path="/notelist"{...rest} render={ (props) => { <NoteList {...props}/> }} />
        <Route path="/login" {...rest} render={(props) => { <Login {...props} /> }} />
      </div>
    );
  }
}

export default App;
