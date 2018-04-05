import React, { Component } from 'react';
import '../css/index.css';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchNotes } from '../actions';

class NoteList extends Component {

  async componentDidMount() {
    const uuID = localStorage.getItem('uuID');
    await this.props.fetchNotes(uuID);
    console.log('Fetched fresh info from the DB!');
  }

  render() {
    return <div className="NoteList">
      <div className="NoteList__header">
        Your Notes:
      </div>
      <div className="NoteList__card-container">
        {
          this.props.notes ? this.props.notes.map((note) => {
            return (
              <Link key={note.id} className="NoteList__card" to={`/note/${note.id}`}>
                <div className="NoteList__card-header">
                  {note.title}
                </div>
                <div className="NoteList__card-content">
                  {note.text}
                </div>
              </Link>
            );
          }) : null
        }
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  console.log('State was mapped to props.', state);
  return {
    notes: state.notes,
  }
}

export default connect(mapStateToProps, { fetchNotes })(NoteList);