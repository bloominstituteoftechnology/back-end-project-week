import React, { Component } from 'react';
import NoteListNote from './noteListNote';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNotes } from '../actions'

class NoteList extends Component {
  componentDidMount() {
    this.props.getNotes();
  }
  clampNote = (content, limit) => {
    let textArr = content.split('')
    let result = [];
    if (content.length > limit) {
      return result.concat(textArr
        .slice(0, limit).join('') + '...')
      }
      return content;
    }
    render() {
      console.log('NoteList props: ', this.props);
    return (
      <div className="note-list">
      <div className="note-list__title">Your Notes:</div>
          { this.props.notes ? this.props.notes.map((note) => {
            console.log('note: ', note);
            return (
              <div key={note._id}>
                <NavLink className="note-list-note-link" to={`/note/${note.id}/${note.title}/${note.content}`}>
                  <NoteListNote title={this.clampNote(note.title, 10)} content={this.clampNote(note.content, 100)} />
                </NavLink>
              </div>
            )
          }) : null};
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes
  };
};

export default connect(mapStateToProps, { getNotes })(NoteList);