import React, { Component } from 'react';
import { createNote } from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CreateNote extends Component {
  state = {
    newNote: {
      title: '',
      text: '',
      users: this.props.users
    }
  };

  handleOnChange(event) {
    event.preventDefault();
    let noteCopy = this.state.newNote;
    noteCopy[event.target.name] = event.target.value;
    this.setState({ newNote: noteCopy });
  }
  handleOnSubmit(event) {
    event.preventDefault();
    this.props.createNote(this.state.newNote);
    this.setState({ newNote: { title: '', text: '' } });
    this.props.history.push('/home');
  }

  render() {
    return (
      <div className="CreateNote">
        <h4 className="title">Create New Note:</h4>
        <form
          onSubmit={this.handleOnSubmit.bind(this)}
          onChange={this.handleOnChange.bind(this)}
        >
          <input
            className="newTitle"
            type="text"
            name="title"
            placeholder="New Title"
            value={this.state.newNote.title}
          />
          <input
            className="newContent"
            type="text"
            name="text"
            placeholder="New Content"
            value={this.state.newNote.text}
          />
          <button className="save" type="submit">
            Save
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    notes: state.notes,
    users: state.auth.users
  };
};

export default withRouter(connect(mapStateToProps, { createNote })(CreateNote));
