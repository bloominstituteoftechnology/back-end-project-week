import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { view_button_click, load_notes } from '../actions/index';

import './css/EditNote.css';

const ROUTE = 'https://pure-sands-16313.herokuapp.com/notes/';

class EditNote extends React.Component {
  state = {
    title: this.props.note.title,
    body: this.props.note.body,
  };

  render() {
    return (
      <div className="edit-note">
        <h1 className="edit-header"> Edit Note: </h1>
        <form onSubmit={this.handleSumbit}>
          <input
            className="title-input"
            type="text"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <textarea
            className="body-input"
            type="text"
            value={this.state.body}
            onChange={this.handleBodyChange}
          />
          <button className="update" type="submit">
            Update
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
    const revisedNote = { title: this.state.title, body: this.state.body };
    axios
      .put(`${ROUTE}${this.props.currentUser}/${this.props.note._id}`, revisedNote)
      .then(() => {
        axios
          .get(`${ROUTE}${this.props.currentUser}`)
          .then((data) => {
            this.props.load_notes(data.data.foundNotes);
          })
          .then(() => {
            this.props.view_button_click();
          });
      })
      .catch((error) => {
        alert('Error Editing Note', error);
      });
  };
}

const mapStateToProps = (state) => {
  return {
    note: state.note,
    current: state.current,
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps, { view_button_click, load_notes })(EditNote);
