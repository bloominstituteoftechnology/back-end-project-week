import React, { Component } from 'react';
import NavBar from './binder/NavBar';
import { Route, Switch } from "react-router-dom";
import NotesList from './binder/NotesList';
import NoteView from './binder/NoteView';
//import Edit from './binder/Edit';
import Delete from './binder/Delete';


import Create from './binder/Create';
import { connect } from 'react-redux';
import  { fetchData }  from '../actions/index';

import './App.css';


class App extends Component {
  componentDidMount() {
    this.props.fetchData();
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
              <Route exact path="/notes/:id" component={NoteView} />
              <Route path="/create" component={Create} />
              {/* <Route exact path="/notes/:id/edit" component={Edit} /> */}
              <Route exact path="/notes/:id/delete" component={Delete} />

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

export default connect(mapStateToProps, { fetchData })(App);
