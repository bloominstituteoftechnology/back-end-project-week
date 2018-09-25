import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }


  render() {
    return (
      <div className="note">
        {/* 
          - title,
          - content,
          - data created
          - buttons: {
            --- "edit",
            --- "delete",
            --- "back (to list)"
          }
         */}
      </div>
    );
  }
}

export default Note;
