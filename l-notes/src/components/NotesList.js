import React from 'react';
import Notes from './Notes.js';
import axios from 'axios'


class NotesList extends React.Component {
  state = {
    notes: []
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt')

    const auth = {
      headers: {
        authorization: token
      }
    }


    axios
      .get('Http://localhost:5000/api/notes', auth)
      .then(response => {
        this.setState({ notes: response })
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  render() {
    return(
      <div className='notes-list'>
        <h3>Your Notes:</h3>
        <div className='notes'>
          {this.state.notes.map(note => (
              <Notes key={note.id} note={note} />
          ))}
        </div>
      </div>
    )
  }
}

export default NotesList;
