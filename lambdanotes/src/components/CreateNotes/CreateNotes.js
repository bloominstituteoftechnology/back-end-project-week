/* eslint-disable */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CreateNotes.css';

class CreateNotes extends Component {
  state = {
    title: '',
    message: '',
  };

  updateNote = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  addNote = event => {
    const completedNote = {
      title: this.state.title,
      message: this.state.message,
    };

    this.props.setAppState(completedNote);

    this.setState({
      title: '',
      message: '',
    });
  };

  render() {
    return (
      <div className="container">
        <div className="new-note_message">
          <div className="new-note_header">Create New Note:</div>
          <div className="new-note_fields">
            <form type="submit">
              <div className="title-div">
                <input
                  type="text"
                  className="title-input"
                  placeholder="Note Title"
                  onChange={this.updateNote}
                  name="title"
                  value={this.state.title}
                />
              </div>
              <div className="message-div">
                <textarea
                  type="text"
                  className="message-input"
                  placeholder="Note Message"
                  onChange={this.updateNote}
                  name="message"
                  value={this.state.message}
                />
              </div>
              <Link to="/" className="each-link" onClick={this.addNote}>
                <input type="submit" value="Save" className="submit-button" />
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateNotes;