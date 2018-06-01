// REACT COMPONENTS
import React, { Component } from 'react';
import axios from 'axios';

// ROUTER COMPONENTS
import { Link } from 'react-router-dom'

class CreateNote extends Component {
  constructor(props){
    super(props)
    this.state= {
      note: [{
        title: '',
        text: '',
      }]
    }
  }

  saveNote = () => {
    const myNote = { title: this.state.title, text: this.state.text }
    axios.post(`https://my-bible-app.herokuapp.com/api/notes`, myNote)
        .then(savedNote => {
            console.log(savedNote);
        })
        .catch(err => {
            console.log(err);
        });
    this.setState({ title: '', text: ''});
  };

  render() {
    return (
      <div className="APP__CREATE-NOTE">
        <h4>Create New Note:</h4>
          <input className="APP__CREATE-TITLE"
            type="text"
            placeholder="Note Title"
            name="title"
            value={this.state.note.title}
            onChange={e => this.setState({ [e.target.name]: e.target.value })}
            />
          <textarea className="APP__CREATE-CONTENT"
            type="text"
            placeholder="Note Content"
            name="text"
            value={this.state.note.text}
            onChange={e => this.setState({ [e.target.name]: e.target.value })}
            />
          <Link to="/"><button className="APP__CREATE-SAVE"
            onClick={ this.saveNote }>Save</button></Link>
      </div>
    );
  };
};

export default CreateNote;