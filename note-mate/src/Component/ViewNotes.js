import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import { addNote, updateNote, deleteNote } from '../Actions';

import Notes from './Notes';

class ViewNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      id: -1,
    }
  }

  componentDidMount() {
    const defaultNote = this.props.notes[0];
    this.setState({
      title: defaultNote.Title,
      text: defaultNote.Text,
      id: defaultNote.ID
    })
  }

  addNoteToggle = () => {
    this.setState({
      title: '',
      text: '',
      id: -1
    })
  }

  noteChangeHandler = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  updateNote = event => {
    event.preventDefault();
    const editNote = {
      ID: this.state.id,
      Title: this.state.title,
      Text: this.state.text
    }
    const note = {
      Title: this.state.title,
      Text: this.state.text
    }

    if (this.state.text.length === 0 || this.state.title.length === 0) {
      alert('You need to have a Title and Text in your note before you can save');
    } else if (this.state.text.length > 0 && this.state.title.length > 0 && this.state.id > -1) {
      this.props.updateNote(editNote);
    } else if (this.state.id === -1 && this.state.text.length > 0 && this.state.title.length > 0) {
      this.props.addNote(note);
      this.setState({
        id: this.props.notes.length
      });
    }
  }

  previewNote = (title, text, id) => {
    const noteTitle = title;
    const noteText = text;
    const noteId = id;
    this.setState({title: noteTitle, text: noteText, id: noteId});
    console.log(noteId);
  }

  deleteNote = (event) => {
    if(this.state.id === -1) {
      this.setState({
        title: '',
        text: '',
        id: -1
      })
    } else {
      event.preventDefault();
      this.props.deleteNote(this.state.id);
      this.setState({
        title: '',
        text: '',
        id: -1
      })
    }
  }

  render() {
    return (
        <div className="DashBoard">
            <Notes previewNote={this.previewNote} />                
            <div className='ViewNote'>
              <div className='ViewNote--addNote'>
                <button onClick={this.addNoteToggle}>Add New Note</button>
              </div>
              <form onSubmit={this.updateNote}>
                <label>Title: </label>
                <input name='title' onChange={this.noteChangeHandler} value={this.state.title} type='text' placeholder="Title" required />
                <br />
                <label>Body: </label>
                <textarea className='ViewNote--text' name='text' onChange={this.noteChangeHandler} value={this.state.text} type='text' placeholder="Add Notes" required />
                <br />
              </form>
                <div className='ViewNote--update'>
                  <button onClick={this.updateNote}>Save</button>
                  <button onClick={this.deleteNote}>Delete</button>
                </div>
            </div>
        </div>
    );
  }

}

const mapStateToProps = state => {
    return {
        notes: state.notes,
        noteAdded: state.noteAdded
    }
}

export default withRouter(connect(mapStateToProps, {addNote, updateNote, deleteNote})(ViewNotes));