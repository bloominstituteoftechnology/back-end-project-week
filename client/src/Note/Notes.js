import React, { Component } from 'react';
import db from '../dummyData.js';

import { Link } from 'react-router-dom';

class Notes extends Component {
  state = {
    notes: []
  }
  componentDidMount = () => {
    this.setState({ notes: db.data.notes })
  }
  render() {
    const { notes } = this.state;
    return (
      <div>
        {notes.map((note, index) =>
          <div key={index}>{note.title} - {note.content}</div>
        )}
      </div>
    );
  }
}

export default Notes;
