import React, { Component } from 'react';
import axios from 'axios';
import { ROOT_URL } from '../config.js';

class EditNote extends Component {
    state ={
        _id: this.props.match.params.id,
        user: this.props.notes[0].user,
        title: this.props.match.params.title,
        content: this.props.match.params.content,
        
    }
  getNoteIndex = () => {
    for (let i = 0; i < this.props.notes.length; i++) {
      console.log('note id: ', this.props.match.params.id);
      console.log('list of notes we are editing: ', this.props.notes);
      console.log('id of note in list we are editing on the front end: ', this.props.notes[i]._id)
      
        if (this.state._id === this.props.notes[i]._id) {
            console.log('index in if statement: ', i)
            return i;
        }
    
    }
    console.log('How is i defined here? ')
  }
  noteSubmitHandler = (event) => {
      event.preventDefault();
      this.setState({ title: this.state.title, content: this.state.content });
      const _id = this.state._id;
      console.log('id: ', _id);
      const title = this.state.title;
      console.log('title: ', title);
      const content = this.state.content;
      console.log('content: ', content);
      axios
        .put(`${ROOT_URL}/api/notes/update`, { _id, title, content })
        .then(res => res)
        .catch(err => console.error(err));
      this.props.notes.splice(this.getNoteIndex(), 1, this.state);
      console.log('notes list after the splice: ', this.props.notes);
      this.props.history.push(`/note/${this.state.title}/${this.state.content}/${this.state._id}/`)
  }
  noteChangeHandler = (event) => {
      let { name, value } = event.target;
      this.setState({ [name]: value });
      
  }
  render() {
    // console.log('what is state here: ', this.state)
    // console.log('what is props in edit note component: ', this.props)
    //   console.log('Does my function give me the right index?', this.getNoteIndex());
    //   console.log(this);
    //   console.log(this.props);
      console.log(this.props.notes.length);
      console.log(this.props.notes[0]);
      console.log(this.props.notes[1]);
      console.log('Edit This! ', this);
      console.log('this.state.user: ', this.state.user);
      ;
    //   console.log('The id of the index 2 note object', this.props.notes[2].id)
    //   console.log(this.props.notes.slice(-1));
    //   console.log(this.props.notes.slice(-1)[0]);
    //   console.log(this.props.notes.slice(-1)[0].id);
    //   console.log(this.props.notes.concat(this.state))
      return (
          <div className="new-note-container">
            <div className="note-list__title">Edit Note:</div>                
            <div className="new-note__title-input" name="id" value="9">
              <textarea 
                className="title-input" 
                placeholder={this.props.match.params.title}
                rows="50" cols="1" 
                maxLength="50" 
                name="title" 
                value={this.state.title}
                onChange={this.noteChangeHandler}
              />    
            </div>
            <div className="new-note__content-input">
              <textarea 
                className="content-input" 
                placeholder={this.props.match.params.content}
                rows="4" 
                cols="72" 
                name="content"
                value={this.state.content}
                onChange={this.noteChangeHandler}
              />
            </div>
            <div className="save-btn-container">
              <div className="save-btn" onClick={this.noteSubmitHandler}>Save</div>
            </div>
          </div>
      )
  }
}

export default EditNote;