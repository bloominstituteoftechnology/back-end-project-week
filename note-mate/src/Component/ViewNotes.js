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

  newNote = event => {
    event.preventDefault();
    const note = {
      Title: this.state.title,
      Text: this.state.text
    }

    const editNote = {
      ID: this.state.id,
      Title: this.state.title,
      Text: this.state.text
    }

    if (this.state.id > -1) {
      this.props.updateNote(editNote);
      this.setState({
        title: '',
        text: '',
        id: -1,
      });
    } 
    else if (this.state.text.length === 0 || this.state.title.length === 0) {
      alert('You need to have a Title and Text in your note before you can save');
    } else {
      this.props.addNote(note);
      this.setState({
        title: '',
        text: '',
        id: -1,
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
                <h2>Note Section</h2>
                <button onClick={this.addNoteToggle}>Add New Note</button>
                <form>
                    <input name='title' onChange={this.noteChangeHandler} value={this.state.title} type='text' placeholder="Title" required />
                    <input className='ViewNote--text' name='text' onChange={this.noteChangeHandler} value={this.state.text} type='text' placeholder="Add Notes" required />
                    <button onClick={this.newNote}>Save</button>
                    <button onClick={this.deleteNote}>Delete Note</button>
                </form>
            </div>
        </div>
    );
  }

}

const mapStateToProps = state => {
    return {
        notes: state.notes
    }
}

export default withRouter(connect(mapStateToProps, {addNote, updateNote, deleteNote})(ViewNotes));