import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
// import './NavBar.css';
import NewNoteForm from '../Forms/NewNoteForm.js';
import NoteList from '../NoteList/NoteList.js';
import Login from '../Login/Login.js';
import styled from 'styled-components';

const NavBarContainer = styled.div`
  width:100%;
  height:20px;
  margin:0 auto;
  display: flex;
  flex-flow: row;
  justify-content:space-around;
  background-color: #E3FFD5;
  text-decoration:none;
  color: #342D33;
`;

const linkStyle = {
  fontFamily: 'sans-serif',
  fontSize: '2rem',
  textDecoration: 'none',
  color: '#E3FFD5',
  width: '100%',
  textAlign: 'center',

}

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
       
  
          <Link className="nav-link" style={linkStyle} to="/newnote" >Add New Note</Link>
          <Link className="nav-link" style={linkStyle} to="/notelist">View Notes</Link>
          <Link className="nav-link" style={linkStyle} to="login">Login</Link>
          <Route path="/newnote" render={(props) => { <NewNoteForm {...props} /> }} />
          <Route path="/notelist" render={(props) => { <NoteList {...props} /> }} />
          <Route path="/login"  render={(props) => { <Login {...props} /> }} />
     
      </NavBarContainer>
    );
  }
}

export default NavBar;
