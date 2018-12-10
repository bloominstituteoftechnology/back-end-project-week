import React, { Component } from "react";
import axios from "axios";

class EditNote extends Component {
  constructor() {
    super();
    this.state = {
      editedNote: {
        title: "",
        content: ""
      }
    };
  }

  componentDidMount() {
    const id = localStorage.getItem("noteID");
    console.log(id);
    axios.get(`/api/notes/${id}`).then(
      res =>
        this.setState({
          editedNote: res.data
        })
      // console.log(res.data.textBody)
    );
  }

  handleEditNoteFormChange = e => {
    this.setState({
      editedNote: {
        ...this.state.editedNote,

        [e.target.name]: e.target.value
      }
    });
  };

  editNote = e => {
    e.preventDefault();
    axios
      .put(
        `/api/notes/${localStorage.getItem("noteID")}`,
        this.state.editedNote
      )
      .then(
        this.props.handleEditNote,
        this.props.history.push(`/notes/${localStorage.getItem("noteID")}`)
      );
  };
  render() {
    return (
      <div className="note-form">
        <h1>Edit Note:</h1>
        <form onSubmit={this.editNote}>
          <input
            type="text"
            placeholder="Note Title"
            defaultValue={this.state.editedNote.title}
            onChange={this.handleEditNoteFormChange}
            name="title"
          />
          <textarea
            id="create-note-body"
            cols="30"
            rows="20"
            value={this.state.editedNote.content}
            onChange={this.handleEditNoteFormChange}
            placeholder="Note comment"
            name="content"
          />
          <input type="submit" id="create-submit" value="Save" />
        </form>
      </div>
    );
  }
}

export default EditNote;
