import React, { Component } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import { Route, Switch } from 'react-router-dom'
import NoteView from './components/NoteView'
import EditNote from './components/EditNote'
import AddNote from './components/AddNote'
import Home from './components/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'


class App extends Component {
  
 
  render() {
    return (
      <div className="App">       
          <Route exact path = '/' render = {()=><Home />} />
          <Route exact path = '/register' render = {()=><Register />} />
          <Route exact path = '/login' render = {()=><Login />} />
          <Route path = '/note' render = {()=><Sidebar />} />
        <Switch> 
          <Route exact path = '/note' render = {()=><NoteList />} />
          <Route exact path = '/note/view/:id' render = {()=><NoteView />} />
          <Route exact path = '/note/:id/edit' render = {()=><EditNote />} />
          <Route exact path = '/note/new' render = {()=><AddNote />} />
        </Switch>
      </div>
    );
  }
}

export default App;
