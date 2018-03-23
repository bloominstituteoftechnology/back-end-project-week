import React from 'react';
import { connect } from 'react-redux';
import { editNote } from '../actions';
import './UpdateNoteForm.css';

class UpdateNoteForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      noteText: ''
    };
  }

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitChangeHandler = event => {
    event.preventDefault();
    const id = this.props.selected._id;
    const form = document.getElementById('updateForm');
    this.props.editNote({ id, ...this.state });
    form.reset();
    this.setState({
      title: '',
      noteText: ''
    });
  };

  render() {
    return (
      <form className="UpdateNoteForm" id="updateForm">
        <span className ="updateButton" onClick={() => this.props.showNoteHandler({})}> X </span>
        <h4>...Or you can edit the contents of the note!</h4>
        <input
          onChange={this.inputChangeHandler}
          placeholder={this.props.selected.title}
          name="title"
        />
        <br />
        <input
          onChange={this.inputChangeHandler}
          placeholder={this.props.selected.noteText}
          name="noteText"
        />
        <br />
        <button onClick={this.submitChangeHandler}>{`Update the post: ${
          this.props.selected.title
        }`}</button>
      </form>
    );
  }
}

export default connect(null, { editNote })(UpdateNoteForm);
