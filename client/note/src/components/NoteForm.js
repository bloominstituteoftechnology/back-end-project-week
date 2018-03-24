import React, { Component } from "react";
import { connect } from "react-redux";
import { createNote } from "../actions";
import "./NoteForm.css";

class NoteForm extends Component {
  state = {
    name: window.localStorage.getItem('username'),
    title: "",
    noteText: ""
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitChangeHandler = event => {
    event.preventDefault();
    this.props.createNote(this.state);
    this.setState({
      title: "",
      noteText: ""
    });
  };

  render() {
    return (
      <div className="noteForm">
        <div>Add a new note:</div>
        <br />
        <form onSubmit={this.submitChangeHandler}>
          <input
            onChange={this.inputChangeHandler}
            placeholder="title"
            name="title"
            value={this.state.title}
          />
          <br />
          <input
            onChange={this.inputChangeHandler}
            placeholder="note text"
            name="noteText"
            value={this.state.noteText}
          />
          <br />
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { createNote })(NoteForm);
