import React, { Component } from "react";
import { CardColumns } from "reactstrap";
import axios from "axios";

import Note from "../components/Note";
import SelectedNote from "./SelectedNote";
import NoteForm from "./NoteForm";

class Notes extends Component {
  state = {
    notes: [],
    selectedNoteId: null,
    error: false
  };

  componentDidMount() {
    axios
      .get("/get/all")
      .then(response => {
        const notes = response.data;
        this.setState({ notes: notes });
        // console.log( response );
      })
      .catch(error => {
        // console.log(error);
        this.setState({ error: true });
      });
  }

  handleSelectedNote = id => {
    this.setState({ selectedNoteId: id });
  };

  render() {
    let notes = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      notes = this.state.notes.map(note => {
        return (
          <Note
            key={note.id}
            title={note.title}
            textBody={note.textBody}
            clicked={() => this.handleSelectedNote(note.id)}
          />
        );
      });
    }

    return (
      <div>
        <CardColumns>{notes}</CardColumns>
        <div>
          <SelectedNote id={this.state.selectedNoteId} />
        </div>
        <div>
          <NoteForm submit="Add Note" />
        </div>
      </div>
    );
  }
}

export default Notes;
