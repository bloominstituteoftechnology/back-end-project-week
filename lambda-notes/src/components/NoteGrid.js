import React, { Component } from 'react';
import Note from './Note';
import { getNotes } from '../actions/actions';
import { connect } from 'react-redux';
import './NoteGrid.css';

class NoteGrid extends Component {
  componentDidMount(){
    this.props.getNotes();
  }
  render() {
    return (
      <div>
        <h3>Your Notes</h3>
        <div className="row">
          {this.props.searching && this.props.filteredNotes.length <= 0 ? (
            <div className="col-12">
              <p>Nothing Found...</p>
              </div>
          ) : (
            this.props.notes.map((note, i) => {
              return (
                <Note
                  title={note.noteTitle}
                  body={note.noteBody}
                  key={i}
                  id={note._id}
                />
              );
            })
          )}
        </div>
        {this.props.notes.length === 0 && (
          <div>
            <p>No notes here...</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.filteredNotes.length > 0 ? state.filteredNotes : state.notes,
    filteredNotes: state.filteredNotes,
    searching: state.searching,
    error: state.error,
  };
};

export default connect(mapStateToProps, { getNotes })(NoteGrid);