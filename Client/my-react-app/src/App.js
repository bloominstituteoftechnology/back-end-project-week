import React, { Component } from 'react';
import './App.css';
import NotesList from './components/NotesList';
import NewNote from './components/NewNote';
import DeleteNote from './components/DeleteNote';
import Notes from './components/Notes';
import {Link, Route} from 'react-router-dom';
import axios from 'axios';
import Login from './components/Registration';
import Signup from './components/Signup';

class App extends Component {
  state = {
    Notes: [],
  }

  componentDidMount(){
    this.setState({Notes})
    axios.get('https://murmuring-cove-50514.herokuapp.com/')
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err))
  
  }

  AddNote = note => {

  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={NotesList}/>
        <Route path="/NewNote" component={NewNote}/>
        {/* <Route path="/login" component={Login} /> */}
        <AppliedRoute path="/signup" exact component={Signup} props={childProps} />


      </div>  
    
    );
  }
}

export default App;