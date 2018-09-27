import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import NoteList from '../NoteList/NoteList.js';
import Login from '../Login/Login.js';
import styled from 'styled-components';
import NavBar from '../NavBar/NavBar.js';
import Tack from '../../tack.svg';


const MenuStyle = styled.div`
  ${'' /* width: 100vw;
  height: 100vh; */}
  width:420px;
  height:605px;
  margin:0 auto;
  margin: auto 0;
  display: flex;
  flex-flow: column;
  background-color: #342D33;
  color: #E3FFD5;
`;

const SubMenuStyle = styled.div`
  width: 20vw;
  top:10vh;
  height: auto;
  margin: 10% auto;
  display: flex;
  flex-flow: column;
  ${'' /* align-items:center; */}
`;

const linkStyle = {
  fontFamily: 'sans-serif',
  fontSize: '2rem',
  textDecoration: 'none',
  color: '#E3FFD5',
  width:'100%',
  textAlign:'center',

}
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  handleCreateNote = () => {

  }

  handleLandingUpwardAnimation = () => {

  }

  render() {
    return (
      <MenuStyle className="Menu">
        {/* 
        - LOGO,
        - OPENS MODALS: copyright / "about" link
        */}
        <SubMenuStyle>
          <div><img src={Tack}/></div>
          <NavBar/>
          <Link to="/newnote" style={linkStyle}>Add New Note</Link>
          <Link to="/notelist" style={linkStyle}>View Notes</Link>
          <Link to="login" style={linkStyle}>Login</Link>
          
          <Route path="/notelist" render={(props) => { <NoteList {...props} /> }} />
          <Route path="/login"  render={(props) => { <Login {...props} /> }} />
        </SubMenuStyle>
      </MenuStyle>
    );
  }
}

export default Menu;
