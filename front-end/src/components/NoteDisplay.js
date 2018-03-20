import React, { Component } from 'react';
import Notes from './Notes';
import { getNotes } from '../actions';
import { connect } from 'react-redux';
import './NoteDisplay.css';

class NoteDisplay extends Component {
  componentDidMount() {
    this.props.getNotes();
  }

  render() {
    return(
      <div className="note-container">
        <div className="display-list">
          {this.props.notesFetched ? (this.props.notes.map((note, index) => {
            return <Notes key={index} index={index} note={note} />;
          })
        ) : (
          <img className="brand" alt="logo" />
        )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    notesFetched: state.notesFetched,
  };
};

export default connect(mapStateToProps, { getNotes })(NoteDisplay);