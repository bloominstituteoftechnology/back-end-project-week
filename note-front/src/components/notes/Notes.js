import React, { Component } from "react";
import "../../styles/App.css";
import logo from "../../logo.svg";
import Modal from "../misc/Modal";
import { connect } from "react-redux";
import {
  deleteNote,
  updateSingleNote,
  updateNote,
} from "../../actions";
import NoteEdit from "./NoteEdit";


class Notes extends Component {
  
  handleDeleteNote = (id) => {
    this.props.deleteNote(id);
    this.handleShowNote({});
  };

  handleShowNote = note => {
    this.props.updateSingleNote(note);
  };

  shortenNote = content => {
    console.log("length is", content.length);
    if (content.length > 150) return content.substr(0, 150) + "...";
  }
  render() {
    return (
      <div className="note__container">
        <div className="note__editbox">
          {Object.keys(this.props.noteSelected).length > 0 ? (
            <Modal>
            <NoteEdit
            handleShowNote={this.handleShowNote}
            handleDeleteNote={this.handleDeleteNote}
            selected={this.props.noteSelected}
            />
            </Modal>
          ) : null}

          {this.props.deletingNote ? (
            <img src={logo} className="App-logo" alt="logo" />
          ) : null}
          
        </div>
        {this.props.notes.map(note => {
          return (
            <div
              className="note__card"
              onClick={() => this.handleShowNote(note)}
              key={note._id}
            >
              <div className="note__card__title">{note.title}</div>
              <div className="note__card__text">{this.shortenNote(note.content)}</div>
              <div className="note__card__user">
                {note.user.username}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deletingNote: state.notesReducer.deletingNote,
    showUpdate: state.noteReducer.showUpdate,
    noteSelected: state.noteReducer.noteSelected,
    updateNote: state.notesReducer.updateNote,
    updateSingleNote: state.noteReducer.updateSingleNote,
    error: state.notesReducer.error
  };
};

export default connect(mapStateToProps, {
  deleteNote,
  updateSingleNote,
  updateNote
})(Notes);
