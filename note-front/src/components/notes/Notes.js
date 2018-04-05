import React, { Component } from "react";
import "../../styles/App.css";
import logo from "../../logo.svg";
import { connect } from "react-redux";
import {
  deleteNote,
  updateSingleNote,
  toggleShowUpdate,
  updateNote,
} from "../../actions";
import NoteEdit from "./NoteEdit";
import EditNoteForm from "./EditNoteForm";

class Notes extends Component {
  handleDeleteNote = () => {
    const { id } = this.props.noteSelected;
    this.props.deleteNote(id, this.props.notes);
    this.handleShowNote({});
  };

  handleUpdateNote = data => {
    console.log("handle update note", data);
    this.props.updateNote(data);
    this.handleShowNote({});
  };

  handleShowNote = note => {
    console.log("Clicked on note");
    this.props.updateSingleNote(note);
  };

  toggleShowUpdate = () => {
    this.props.toggleShowUpdate();
  };

  render() {
    return (
      <div className="note__container">
        <div className="note__editbox">
          {Object.keys(this.props.noteSelected).length > 0 ? (
            <NoteEdit
              handleShowNote={this.handleShowNote}
              toggleShowUpdate={this.toggleShowUpdate}
              handleDeleteNote={this.handleDeleteNote}
              selected={this.props.noteSelected}
            />
          ) : null}
          {this.props.showUpdate ? (
            <EditNoteForm
              note={this.props.noteSelected}
              notes={this.props}
              handleUpdateNote={this.handleUpdateNote}
            />
          ) : null}
          {this.props.deletingNote ? (
            <img src={logo} className="App-logo" alt="logo" />
          ) : null}
        </div>
        {this.props.notes.map(note => {
          console.log(note);
          return (
            <div
              className="note__card"
              onClick={() => this.handleShowNote(note)}
              key={note._id}
            >
              <div className="note__card__title">{note.title}</div>
              <div className="note__card__text">{note.content}</div>
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
  toggleShowUpdate,
  updateNote
})(Notes);
