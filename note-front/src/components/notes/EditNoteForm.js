import React, { Component } from "react";
import "../../styles/EditNoteForm.css";
import { connect } from "react-redux";
import { updateNote } from "../../actions";

class EditNoteForm extends Component {
  constructor() {
    super();
    this.theTitle = "";
    this.theContent = "";
  }

  handleTitleChange = event => {
    this.theTitle = event.target.value;
  };

  handleContentChange = event => {
    this.theContent = event.target.value;
  };

  submitEdits = () => {
    this.props.updateNote({
      id: this.props.note._id,
      title: this.theTitle,
      content: this.theContent,
      user: this.props.note.user._id
    });
    this.theTitle = "";
    this.theContent = "";
  };

  render() {
    return (
      <div className="editnote__container">
        <form className="editnote__form">
          <input
            value={this.props.title}
            name="title"
            type="text"
            placeholder={this.props.note.title}
            onChange={this.handleTitleChange}
          />
          <input
            value={this.props.content}
            name="theText"
            type="text"
            placeholder={this.props.note.content}
            onChange={this.handleContentChange}
          />
          <button onClick={() => this.submitEdits()} type="button">
            Edit Note
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showUpdate: state.noteReducer.showUpdate,
    updateNote: state.notesReducer.updateNote,
    updateSingleNote: state.noteReducer.updateSingleNote,
    error: state.notesReducer.error
  };
};

export default connect(mapStateToProps, {
  updateNote
})(EditNoteForm);
