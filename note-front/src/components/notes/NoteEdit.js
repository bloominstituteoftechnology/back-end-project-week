import React, { Component } from "react";
import { connect } from "react-redux";
import "../../styles/NoteEdit.css";
import EditNoteForm from "./EditNoteForm";
import { toggleShowUpdate } from "../../actions";

class NoteEdit extends Component {
  handleToggleUpdate = () => {
    this.props.toggleShowUpdate();
  };
  render() {
    return (
      <div className="note__edit__menu">
        <span onClick={() => this.props.handleShowNote({})}>
          <img
            className="note__edit_close"
            src="https://cdn1.iconfinder.com/data/icons/feather-2/24/x-256.png"
            alt="close"
          />
        </span>
        <h3>{this.props.selected.title}</h3>
        <div>{this.props.selected.content}</div>
        <div>{this.props.selected.user.username}</div>
        <button
          onClick={() => this.props.handleDeleteNote(this.props.selected._id)}
        >{`Delete This Note`}</button>
        <button onClick={() => this.handleToggleUpdate()}>{`Update This Note`}</button>
        {this.props.showUpdate ? (
          <EditNoteForm
            note={this.props.selected}
            handleShowNote={this.props.handleShowNote}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showUpdate: state.noteReducer.showUpdate,
    error: state.notesReducer.error
  };
};

export default connect(mapStateToProps, {
  toggleShowUpdate
})(NoteEdit);
