import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }


  render() {
    return (
      <div className="note-list">
        {/* 
          - search bar (hidden on init),
          - list of NoteListItems,
          - BUTTONS: {
            --- "search",
            --- "add new",
            --- "info"
            --- "main menu"
          }
         */}
      </div>
    );
  }
}

export default NoteList;
