import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaReact from 'react-autosize-textarea';

import { editNote, deleteNote } from '../../actions';

class Note extends Component {
  state = {
    id: -1,
    title: '',
    content: '',
  };

  componentDidMount() {
    this.setState({
      id: this.props.note._id,
      title: this.props.note.title,
      content: this.props.note.content,
    });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkIfTextChanged = _ => {
    if (this.state.title === '' && this.state.content === '') {
      this.props.deleteNote(this.state.id);
      return;
    }

    if (
      this.state.title !== this.props.note.title ||
      this.state.content !== this.props.note.content
    ) {
      this.props.editNote(this.state);
    }
  };

  render() {
    return (
      <div className="Note">
        <input
          className="NoteTitle"
          onChange={this.handleInputChange}
          name="title"
          type="text"
          value={this.state.title}
          onBlur={this.checkIfTextChanged}
        />

        <TextAreaReact
          className="NoteContent"
          onChange={this.handleInputChange}
          name="content"
          type="text"
          value={this.state.content}
          onBlur={this.checkIfTextChanged}
          rows={5}
          maxRows={15}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //
  };
};

export default connect(mapStateToProps, { editNote, deleteNote })(Note);
