import React, { Component } from 'react';
import './App.css';
import { Route, Link } from "react-router-dom";
import CreateNote from './components/CreateNote';
import SideBar from "./components/SideBar";
import Notes from "./components/Notes";
import Note from "./components/Note";
import EditNote from './components/EditNote';
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";


class App extends Component {


  render() {
    return <div className="container-fluid custom-container">
        <div className="row custom-row">
          <Route path="/" component={SideBar} />
        {/* {localStorage.getItem('token') && (   */}
          <Route exact path="/" component={Notes} /> 
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path="/login" component={LoginForm} />                    
          <Route exact path="/create" component={CreateNote} />
          <Route exact path="/notes/:id" component={Note} />
          <Route exact path="/edit/:id" component={EditNote} />
        </div>
      </div>;
  }
}





export default App;
