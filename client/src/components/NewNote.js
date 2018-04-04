import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNote, fetchNotes } from '../actions';
import '../css/index.css';

class NewNote extends Component {
  state = {
    titleText: '',
    contentText: '',
  };

  render() {
    return (
      <div className="EditView">
        <div className="EditView__header">
          Create New Note:
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
          <button className="Form__submit" type="submit">Save</button>
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
    await this.props.addNote(this.state.titleText, this.state.contentText);
    this.props.fetchNotes(localStorage.getItem('uuID'));
    this.setState({titleText: ''});
    this.setState({contentText: ''});
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
  }
}


export default connect(mapStateToProps, { addNote, fetchNotes })(NewNote);