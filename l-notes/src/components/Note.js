import React from 'react';
import axios from 'axios'



class Note extends React.Component {
  constructor(props) {
    // eslint-disable-next-line
    super(props),
    this.state = {
      auth: {},
      note: {},
      delMenu: 'hidden',
      openNote: null,
      updateNote: 'hidden',
      editTitle: '',
      editTopic: '',
      editText: '',
      editedText: ''
    }
  }

  eHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  deletePrompt = e => {
    this.setState({delMenu: null})
  }

  deleteCancel = e => {
    this.setState({delMenu: 'hidden'})
  }

  startEdit = e => {
    this.setState({openNote: 'hidden', updateNote: null})
  }

  cancelEdit = e => {
    this.setState({openNote: null, updateNote: 'hidden'})
  }

  deleteNote = e => {
    let id = this.props.match.params.id
    let auth = this.state.auth

    axios
      .delete(`http://localhost:8000/api/notes/${id}`, auth)
      .then(response => {console.log(response)})
      .catch(err => {console.log(err.message)})

    this.props.history.push('/home')
  }

  updateNote = e => {
    let id = this.props.match.params.id
    let auth = this.state.auth

    let note = {
      title: this.state.editTitle,
      topic: this.state.editTopic,
      text: this.state.editText
    }

    axios
      .put(`http://localhost:8000/api/notes/${id}`, note, auth)
      .then(response => {console.log(response)})
      .catch(err => {console.log(err.message)})
    this.props.history.push(`/notes/${id}`)
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt')

    const auth = {
      headers: {
        authorization: token
      }
    }

    this.setState({ auth: auth })

    let id = this.props.match.params.id
    console.log(id)

    axios
      .get(`http://localhost:8000/api/notes/${id}`, auth)
      .then(response => {
        this.setState({note: response.data, editTitle: response.data.title, editTopic: response.data.topic, editText: response.data.text })
      })
      .catch(err => {console.log(err.message)})
}

  render() {

    const delMenu = `delete-verification ${this.state.delMenu}`
    const openNote = `open-note ${this.state.openNote}`
    const updateNote = `edit-note ${this.state.updateNote}`

    return (
      <div>
        <div className={openNote}>
          <div className='options'>
            <span>Last edited: {this.state.note.time}</span>
            <span onClick={this.startEdit}>Edit</span>
            <span onClick={this.deletePrompt}>Delete</span>
          </div>
          <h3>{this.state.note.title}</h3>
          <h4>Topic: {this.state.note.topic}</h4>
          <p>{this.state.note.text}</p>
          <div className={delMenu}>
            <div className="delete-box">
              <h4>Are you sure you want to delete this note?</h4>
              <button className='delete-button' onClick={this.deleteNote}>Delete</button>
              <button onClick={this.deleteCancel}>No</button>
            </div>
          </div>
        </div>
        <div className={updateNote}>
          <h3>Edit Note:</h3>
          <form onSubmit={this.updateNote}>
            <input
              className="edit-title"
              onChange={this.eHandler}
              defaultValue={this.state.note.title}
              name="editTitle"
            />
            <input
              className="edit-topic"
              onChange={this.eHandler}
              defaultValue={this.state.note.topic}
              name="editTopic"
            />
            <textarea
              className="edit-text"
              name="editText"
              onChange={this.eHandler}
              value={this.state.editText}
            ></textarea>
            <div className='buttons'>
              <button type="submit">Update Note</button>
              <button className='cancel-button' onClick={this.cancelEdit}>Cancel Edit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Note;
