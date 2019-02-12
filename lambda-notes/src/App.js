import React, { Component } from 'react';
import './App.css';

import NavBar from './NavBar/NavBar';
import CreateNote from './CreateNote/CreateNote';
import EditNote from './EditNote/EditNote';
import NotesList from './NotesList/NotesList';
import ExpandedNote from './ExpandedNote/ExpendedNote';

import {Route} from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.div`
  max-width:1024px;
  width:100%;
`

class App extends Component {
  state = {
    notes : []
  }

  
  render() {
    return (
      
      <Container >
        <NavBar/>
        <Route exact path = '/' render = {(props) => < NotesList {...props}/>}/>
        <Route exact path = '/create' render = {(props) => < CreateNote {...props}/>}/>
        <Route exact path = '/edit' render = {(props) => < EditNote {...props}/>}/>
        <Route exact path = '/note/:id' render = {(props) => < ExpandedNote {...props}/>}/>
      </Container>
    );
  }
}

export default App;
