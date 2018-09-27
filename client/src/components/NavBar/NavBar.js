import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
// import './NavBar.css';
import NewNoteForm from '../Forms/NewNoteForm.js';
import NoteList from '../NoteList/NoteList.js';
import Login from '../Login/Login.js';
import styled from 'styled-components';

const NavBarContainer = styled.div`
  width:100%;
  ${'' /* height:705px; */}
  margin:0 auto;
  display: flex;
  flex-flow: row;
  justify-content:space-between;
  background-color: #E3FFD5;
  color: #342D33;
`;

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
      <NavBarContainer className="NavBar">
       
  
          <Link className="nav-link" to="/newnote">Add New Note</Link>
          <Link className="nav-link" to="/notelist">View Notes</Link>
          <Link className="nav-link" to="login">Login</Link>
          <Route path="/newnote" render={(props) => { <NewNoteForm {...props} /> }} />
          <Route path="/notelist" render={(props) => { <NoteList {...props} /> }} />
          <Route path="/login"  render={(props) => { <Login {...props} /> }} />
     
      </NavBarContainer>
    );
  }
}

export default NavBar;
