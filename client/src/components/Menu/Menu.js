import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import NoteList from '../NoteList/NoteList.js';
import Login from '../Login/Login.js';
import styled from 'styled-components';


const MenuStyle = styled.div`
  width: 100vw;
  height: 100vh;
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
`;
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
          <div>LOGO HERE</div>
          <Link to="/newnote">Add New Note</Link>
          <Link to="/notelist">View Notes</Link>
          <Link to="login">Login</Link>
          
          <Route path="/notelist" render={(props) => { <NoteList {...props} /> }} />
          <Route path="/login"  render={(props) => { <Login {...props} /> }} />
        </SubMenuStyle>
      </MenuStyle>
    );
  }
}

export default Menu;
