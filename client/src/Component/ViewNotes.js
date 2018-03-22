import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addNote, updateNote, deleteNote } from "../Actions";

import Notes from "./Notes";

class ViewNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      id: -1
    };
  }

  componentDidMount() {
    if (this.props.notes.length > 0) {
      const defaultNote = this.props.notes[0];
      this.setState({
        title: defaultNote.title,
        content: defaultNote.content,
        id: defaultNote._id
      });
    }
  }

  addNoteToggle = () => {

    if (this.state.title.length > 0 || this.state.content.length > 0) {
      let check = window.confirm("This action will delete your current note.\n\nTo save current note press CANCEL and then SAVE at bottom of page.")
      if (check) {
        this.setState({
          title: "",
          content: "",
          id: -1
        });
      } else {
        return;
      }
    }
    this.setState({
      title: "",
      content: "",
      id: -1
    });
  };

  noteChangeHandler = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  updateNote = event => {
    event.preventDefault();
    const editNote = {
      id: this.state.id,
      title: this.state.title,
      content: this.state.content
    };
    const note = {
      title: this.state.title,
      content: this.state.content
    };

    if (this.state.content.length === 0 || this.state.title.length === 0) {
      alert(
        "You need to have a title and Body in your note before you can save"
      );
    } else if (
      this.state.content.length > 0 &&
      this.state.title.length > 0 &&
      this.state.id !== -1
    ) {
      this.props.updateNote(editNote);
    } else if (
      this.state.id === -1 &&
      this.state.content.length > 0 &&
      this.state.title.length > 0
    ) {
      this.props.addNote(note);
      this.setState({
        title: "",
        content: "",
        id: -1
      });
    }
  };

  previewNote = (title, content, id) => {
    const notetitle = title;
    const notecontent = content;
    const noteId = id;
    this.setState({ title: notetitle, content: notecontent, id: noteId });
  };

  deleteNote = event => {
    if (this.state.id === -1) {
      this.setState({
        title: "",
        content: "",
        id: -1
      });
    } else {
      event.preventDefault();
      this.props.deleteNote(this.state.id);
      this.setState({
        title: "",
        content: "",
        id: -1
      });
    }
  };

  render() {
    return (
      <div className="DashBoard">
        <Notes previewNote={this.previewNote} />
        <div className="ViewNote">
          <div className="ViewNote--addNote">
            <button onClick={this.addNoteToggle}>Add New Note</button>
          </div>
          <form onSubmit={this.updateNote}>
            <label>Title: </label>
            <input
              name="title"
              onChange={this.noteChangeHandler}
              value={this.state.title}
              type="text"
              placeholder="Title"
              required
            />
            <br />
            <label>Body: </label>
            <textarea
              className="ViewNote--text"
              name="content"
              onChange={this.noteChangeHandler}
              value={this.state.content}
              type="text"
              placeholder="Add Notes"
              required
            />
            <br />
          </form>
          <div className="ViewNote--update">
            <button onClick={this.updateNote}>Save</button>
            <button onClick={this.deleteNote}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    id: state.id
  };
};

export default withRouter(
  connect(mapStateToProps, { addNote, updateNote, deleteNote })(ViewNotes)
);
