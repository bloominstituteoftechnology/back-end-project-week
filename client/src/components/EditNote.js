import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editNote, fetchNotes } from '../actions';
import '../css/index.css';

class EditNote extends Component {
  state = {
    titleText: this.props.note.title,
    contentText: this.props.note.text,
  };

  render() {
    return (
      <div className="EditView">
        <div className="EditView__header">
          Edit Note:
        </div>
        <form className="Form" onSubmit={this.handleSubmit}>
          <input type="text"
            className="Form__title"
            placeholder="New note" 
            value={this.state.titleText} 
            onChange={this.handleTitleChange}/>
          <textarea type="text"
            className="Form__text"
            placeholder="Add text here . . ." 
            value={this.state.contentText} 
            onChange={this.handleContentChange}/>
          <button className="Form__submit" type="submit">Update</button>
        </form>
      </div>
    )
  }

  handleTitleChange = (event) => {
    this.setState({titleText: event.target.value})
  }

  handleContentChange = (event) => {
    this.setState({contentText: event.target.value})
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.editNote(this.state.titleText, this.state.contentText, this.props.note.id);
    this.props.fetchNotes(localStorage.getItem('uuID'));
  }
}

const mapStateToProps = (state) => {
  return {
    props: state,
  }
}


export default connect(mapStateToProps, { editNote, fetchNotes })(EditNote);