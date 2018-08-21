import React, { Component } from 'react';
import NavBar from './binder/NavBar';
import { Route, Switch } from "react-router-dom";
import NotesList from './binder/NotesList';
//import Create from './binder/Create';
//import NoteView from './binder/NoteView';
import { connect } from 'react-redux';
import { getData } from '../actions/notesActions';

import './App.css';


class App extends Component {
  componentDidMount() {
    this.props.getData();
  };
  render() {
    return (      
      <div className="App">
        <div className="container">

          <nav className="nav">
            <NavBar />
          </nav>

          <div className="page">
            <Switch>
              <Route exact path="/" component={NotesList} />
              {/* <Route path="/create" component={Create} />
              <Route exact path="/notes:id" component={NoteView} /> */}
            </Switch> 
          </div>         
        </div>  
      </div> 
    );
  };
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { getData })(App);
