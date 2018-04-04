import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import NotesList from '../NotesList/NotesList';
import { connect } from 'react-redux';
import './App.css';
import { getAllNotes, authUser, logout } from '../../actions';

import { Link } from 'react-router-dom';
class App extends Component {
  state = {
    notes: [],
  }
  
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.authUser();
    }
    this.props.getAllNotes();
    this.setState({
      notes: this.props.notes
    });
  }

  render() {
    const props = this.props;
    return (
      <div className="App">
        <Sidebar />
        <div className="Notes-Section">
          <header>Your Notes: </header>
          <div className="Notes-Container">
            {props.state.notes.map((note, index) => <NotesList id={index} note={note}/>)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state,
  }
}

export default connect(mapStateToProps, { getAllNotes, authUser, logout })(App);
