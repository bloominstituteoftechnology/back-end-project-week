import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { add_note, view_button_click, load_notes } from '../actions/index';

import './css/CreateNote.css';

class CreateNote extends React.Component {
  state = {
    title: '',
    body: '',
  };

  render() {
    return (
      <div className="create">
        <h1 className="create-header"> Create New Note: </h1>
        <form onSubmit={this.handleSumbit}>
          <input
            className="title-input"
            type="text"
            placeholder="Note Title"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <textarea
            className="body-input"
            type="text"
            placeholder="Note Content"
            value={this.state.body}
            onChange={this.handleBodyChange}
          />
          <button className="save" type="submit">
            Save
          </button>
        </form>
      </div>
    );
  }
  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };
  handleBodyChange = (event) => {
    this.setState({ body: event.target.value });
  };

  handleSumbit = (event) => {
    event.preventDefault();
    const newNote = { title: this.state.title, body: this.state.body };
    axios
      .post('http://localhost:3000/notes/' + this.props.currentUser, newNote)
      .then(() => {
        axios
          .get('http://localhost:3000/notes/' + this.props.currentUser)
          .then((data) => {
            this.props.load_notes(data.data.foundNotes);
          })
          .then(() => {
            this.props.view_button_click();
          });
      })
      .catch((error) => {
        alert('Error Creating Note', error);
      });
  };
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps, { add_note, view_button_click, load_notes })(CreateNote);
