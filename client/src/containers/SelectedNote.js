import React, { Component } from "react";
import { Card, Button, CardTitle, CardText } from "reactstrap";
import axios from "axios";

import NoteForm from "./NoteForm";

class SelectedNote extends Component {
  state = {
    loadedNote: null,
    isEditOn: false
  };

  componentDidUpdate() {
    if (this.props.id) {
      if (
        !this.state.loadedNote ||
        (this.state.loadedNote && this.state.loadedNote.id !== this.props.id)
      ) {
        axios.get("/get/" + this.props.id).then(response => {
          // console.log(response);
          this.setState({ loadedNote: response.data });
        });
      }
    }
  }

  handleEditNote = () => {
    this.setState(prevState => ({
      isEditOn: !prevState.isEditOn
    }));
  };

  handleDeleteNote = () => {
    axios.delete("/delete/" + this.props.id).then(response => {
      console.log(response);
    });
    document.location.reload();
  };

  render() {
    let note = <p style={{ textAlign: "center" }}>Please select a Note!</p>;
    if (this.props.id) {
      note = <p style={{ textAlign: "center" }}>Loading...!</p>;
    }
    if (this.state.loadedNote) {
      note = (
        <div>
          {this.state.isEditOn ? (
            <NoteForm submit="Edit Note" fill={this.state.loadedNote} />
          ) : null}
          <Card
            body
            inverse
            style={{ backgroundColor: "#333", borderColor: "#333" }}
          >
            <CardTitle>{this.state.loadedNote.title}</CardTitle>
            <CardText>{this.state.loadedNote.textBody}</CardText>
            <Button onClick={this.handleEditNote} color="primary">
              Edit
            </Button>
            <Button onClick={this.handleDeleteNote} color="danger">
              Delete
            </Button>
          </Card>
        </div>
      );
    }
    return note;
  }
}

export default SelectedNote;
