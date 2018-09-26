import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
// import './NavBar.css';
import NewNoteForm from '../Forms/NewNoteForm.js';
import NoteList from '../NoteList/NoteList.js';
import Login from '../Login/Login.js';
import styled from 'styled-components';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  handleCreateNote = () => {

  }


  render() {
    return (
      <div className="NavBar">
      {/* 
        --- MAIN MENU route ???
       */}
        <div >
          <div>LOGO HERE</div>
          <Link to="/newnote">Add New Note</Link>
          <Link to="/notelist">View Notes</Link>
          <Link to="login">Login</Link>
          <Route path="/newnote" render={(props) => { <NewNoteForm {...props} /> }} />
          <Route path="/notelist" render={(props) => { <NoteList {...props} /> }} />
          <Route path="/login"  render={(props) => { <Login {...props} /> }} />
        </div>
      </div>
    );
  }
}

export default NavBar;
