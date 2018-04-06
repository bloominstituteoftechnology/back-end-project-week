import React from 'react';
import NoteThumb from './NoteThumb';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { selectNote, sortNotes, fetchNotes } from '../actions';
import '../styles/NoteList.css';

// props include the list of notes from App.js
class NoteList extends React.Component {
  componentDidMount = () => {
    this.props.fetchNotes();
  }
  
  render() {
    return (
      <div className="noteList__container">
        <h1 className="notesList__header">Your Notes:</h1>
        <CSVLink
          data={this.props.notes}
          filename={'my-notes.csv'}
          className="noteList__download"
        >
          download
        </CSVLink>
        <div className="noteList__sort-options">
          <div className="noteList__sort-title">sort by:</div>
          <div
            onClick={() => this.props.sortNotes('date')}
            className="noteList__sort-option"
          >
            date
          </div>
          <div
            onClick={() => this.props.sortNotes('title')}
            className="noteList__sort-option"
          >
            name
          </div>
        </div>
        <div className="noteList">
          {this.props.notes.map(note => {
            return (
              <div key={note._id} className="notelist__item">
                <Link
                  to={`/view/${note._id}`}
                  onClick={() => this.props.selectNote(note._id)}
                >
                  <NoteThumb note={note} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
  };
};

export default connect(mapStateToProps, { selectNote, sortNotes, fetchNotes })(NoteList);
