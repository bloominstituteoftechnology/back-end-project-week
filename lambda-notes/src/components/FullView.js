import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleDelete } from '../actions';

class FullView extends Component {
  
  handleEditNote = (note) => {
    this.props.history.push({
      pathname: '/edit',
      note: note
    });
  };

  handleDeleteNote = (id) => {
    this.props.toggleDelete();
    this.props.history.push('/delete');
  };

  render() {
    let note = this.props.location.note;

    if (!this.props.location.note) {
      this.props.history.push('/');
      return null;
    }
    return (
      <div>
        <div className="note-top">
          <div className="note-edit" onClick={() => {this.handleEditNote(note)}}>edit</div>
          <div className="note-delete" onClick={() => {this.props.toggleDelete(note.id)}}>delete</div>
        </div>
        <br />
        <div className="title">{note.title}</div>
        <div className="note-content">{note.content}</div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
  };
}

export default connect(mapStateToProps, { toggleDelete })(FullView);