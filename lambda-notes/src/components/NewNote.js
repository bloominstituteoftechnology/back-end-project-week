import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNote } from '../actions';

class NewNote extends Component {
  state = {
    title: '',
    content: ''
  };

  handleOnChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleNewNote = (event) => {
    const { title, content } = this.state;
    event.preventDefault();
    this.props.createNote({ title, content });
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div className="title">
          Create New Note:
        </div>
        <form onSubmit={this.handleNewNote}>
          <input
            className="input-title"
            value={this.state.title}
            name="title"
            type="text"
            placeholder="Note Title"
            onChange={this.handleOnChange}
          />
          <br />
          <textarea
            className="input-content"
            value={this.state.content}
            name="content"
            type="textbox"
            placeholder="Note Content"
            onChange={this.handleOnChange}
          />
          <br />
          <input className="button" type="submit" value="Save" />
        </form>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    creatingNote: state.notes.creatingNote,
    error: state.notes.error
  };
};

export default connect(mapStateToProps, { createNote })(NewNote);
