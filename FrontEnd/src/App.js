import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {addNote, editNote, deleteNote} from './actions'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      id: -1
    }
  }

  componentDidMount() {
    const defaultNote = this.props.notes[0];
    this.setState({
      title: defaultNote.title,
      content: defaultNote.content,
      id: defaultNote.id
    })
  }

  toggleAdd = () => {
    this.setState({
      title: '',
      content: '',
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
      title: this.state.title,
      content: this.state.content
    }

    const updateNote = {
      id: this.state.id,
      title: this.state.title,
      content: this.state.content
    }

    if (this.state.id > -1) {
      this.props.editNote(updateNote);
    } else {
      this.props.addNote(note);
    }
  }

  showNote = (title, content, id) => {
    const notetitle = title;
    const notecontent = content;
    const noteid = id;
    this.setState({title: notetitle, content: notecontent, id: noteid});
  }

  deleteNote = (event) => {
    if(this.state.id === -1) {
      this.setState({
        title: '',
        content: '',
        id: -1
      })
    } else {
      event.preventDefault();
      this.props.deleteNote(this.state.id);
      this.setState({
        title: '',
        content: '',
        id: -1
      })
    }
  }

  render() {
    return (
      <div className='App'>
        <div className='Notes'>
          {this.props.notes.map((note, i) => {
            return <div className='note' onClick={() => {this.showNote(note.title, note.content, note.id)}} key={note.id}>
              <div>{note.title}</div>
              <div>{note.content}</div>
            </div>
          })}
        </div>
        <div className='ShowNote'>
          <h2>KISS NOTE APP</h2>
         <button onClick={this.toggleAdd}>Add New Note</button>
          <form>
            <input name='title' onChange={this.noteChangeHandler} value={this.state.title} type='text' placeholder="Note Title"/>
            <input className='ShowNote--content' name='content' onChange={this.noteChangeHandler} value={this.state.content} type='text' placeholder="Add Notes"/>
            <button onClick={this.newNote}>Save</button>
            <button onClick={this.deleteNote}>Delete</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  }
}

export default connect(mapStateToProps, {addNote, editNote, deleteNote})(App);

/*class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      noteName: ''
    }
  }

  handleChange(e) {
    this.setState ({
      noteName: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let note = {
      noteName: this.state.noteName
      // console.log(this.state.note);
    }
    this.props.addNote(note);
  }

  handleSubmiitEdit(e) {
    e.preventDefault();
    let note = {
      noteName: this.state.noteName,
      noteId: this.state.noteId,
    }
    this.props.editNote(note);
  }

  listView(data, index) {
    return (
      <div>
        <div>
        <li key={index}>{data.noteName}</li>
      </div>
      <div>
        <button onClick={(e) => this.deleteNote(e, index)}> Delete </button>
      </div>
    </div>
    )
  }

  deleteNote(e, index) {
    e.preventDefault();
    this.props.deleteNote(index);
  }

  render() {
  
    return (
      <div>
        <h1>Note App</h1>

      <div>
        <h3>Take a Note!</h3>
        <br />
        <form onSubmit={this.handleSubmit}>
          <input type="content" onChange={this.handleChange} value={this.state.name} /><br />
          <input type="submit" value="ADD" />
        </form>
        <form obSubmit={this.handleSubmitEdit}>
        <input type="hidden" value={this.state.noteId} />
          <input type="content" onChange={this.handleChangeEditNote} value={this.state.noteName} /><br />
          <input type="submit" value="EDIT" />
        </form>
        <br />
        <ul>
          {this.props.notes.map((note, i) => this.listView(note, i))}
        </ul>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    notes: state.notes
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNote: note => dispatch(noteAction.addNote(note)),
    deleteNote: index => dispatch(noteAction.deleteNote(index)),
    editNote: note => dispatch(noteAction.editNote(note)) 
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App); */

