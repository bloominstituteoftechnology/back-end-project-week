import React from "react";
import { connect } from "react-redux";
import { getNotes, deleteNote, updateNote, toggleShowUpdate } from "../actions";
import "./NoteContainer.css";
import UpdateNoteForm from "./UpdateNoteForm";
import SelectedNote from "./SelectedNote";

class NoteContainer extends React.Component {
  componentWillMount = () => {
    this.props.getNotes();   
  }

  deleteNoteHandler = () => {
    const id = this.props.noteSelected._id;
    this.props.deleteNote(id);
  };

  showNoteHandler = note => {
    this.props.updateNote(note);
  };

  toggleShowUpdate = () => {
    this.props.toggleShowUpdate();
  };

  render() {
    return (
      <div>
        <ul className="NoteList">
          {Array.from(this.props.notes).map(item => {
            return (
              <li
                key={item._id}
                onClick={() => this.showNoteHandler(item)}
                className="NoteList__items"
              >
                <div>
                  <h2>{item.title}</h2>
                  <div className="NoteList__body">
                    <p>{item.noteText}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <hr />
        <div className="NoteEdits">
          {Object.keys(this.props.noteSelected).length > 0 ? (
            <div className="NoteEdits__components">
              <SelectedNote
                showNoteHandler={this.showNoteHandler}
                toggleShowUpdate={this.toggleShowUpdate}
                deleteNoteHandler={this.deleteNoteHandler}
                selected={this.props.noteSelected}
              />
              <UpdateNoteForm selected={this.props.noteSelected} showNoteHandler={this.showNoteHandler} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    deletingNote: state.noteReducer.deletingNote,
    showUpdate: state.noteReducer.showUpdate,
    noteSelected: state.noteReducer.noteSelected,
    error: state.noteReducer.error
  };
};

export default connect(MapStateToProps, {
  getNotes,
  updateNote,
  deleteNote,
  toggleShowUpdate
})(NoteContainer);
