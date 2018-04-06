import React, { Component } from "react";
import logo from "../../logo.svg";
import NoteForm from "./NoteForm";
import Notes from "./Notes.js";
import "../../styles/App.css";
import { connect } from "react-redux";
import { getNotes } from "../../actions";

class NoteDisplayer extends Component {
  componentDidMount() {
    this.props.getNotes();
  }

  noteMapper = () => {
    if (this.props.fetchingNotes)
      return <img src={logo} className="App-logo" alt="logo" />;
    else return <Notes notes={this.props.notes} history={this.props.history} />;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NoteForm />
        </header>
        {this.noteMapper()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { notesReducer } = state;
  return {
    notes: notesReducer.notes,
    fetchingNotes: notesReducer.fetchingNotes,
    error: notesReducer.error
  };
};

export default connect(mapStateToProps, { getNotes })(NoteDisplayer);
