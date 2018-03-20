import React, { Component } from 'react';
// import './notes.css';
import NoteUpdate from './NoteUpdate';
// import Remarkable from 'remarkable';
import { connect } from 'react-redux';
import { deleteNote } from '../actions';
import './Notes.css'
// import NoteForm from './NoteForm';

class notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
    };
  }

  updateToggle = () => {
    const active = this.state.update;
    this.setState({ update: !active });
  };

  deleteNote = event => {
    event.preventDefault();
    const deleteIndex = {
      data: {
        index: this.props.index,
      },
    };
    this.props.deleteNote(deleteIndex);
  };

  render() {
    return (
      <div className="Notes">
        <div className="Note-box">
          <div className="title">{this.props.note.title}</div>
          <div className="date">Date Added:{this.props.note.date}</div>
          <div className="text">Note: {this.props.note.text}</div>
          <button className="Update" onClick={this.updateToggle}>
            Update
          </button>
          <button className="Delete" onClick={this.deleteNote}>
            Delete
          </button>
          {this.state.update ? (
            <NoteUpdate data={this.props.note} index={this.props.index} />
          ) : null}
        </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state,
  };
};
export default connect(mapStateToProps, { deleteNote })(notes);
