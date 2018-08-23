import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListView from '../Page/ListView';
import CreateNewView from '../Page/CreateNewView';
import EditView from '../Page/EditView';
import NoteView from '../Page/NoteView';
import Nav from '../Nav';
import axios from 'axios';
import './App.css';

const API_URL = 'https://us-central1-notes-tysonism-com.cloudfunctions.net/app/notes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      searchNotes: [],
      searchTerm: ''
    };
  }

  onAddNote = note => {   
    console.log('add', note);
    axios
      .post(API_URL, note)
      .then(res=> {
        console.log('posted', res);
        window.location.href = '/';
      })
      .catch(e => console.log(e));   
  }

  onUpdateNote = note => {
    console.log('update', note);
    axios
      .put(`${API_URL}/${note.id}`, note)
      .then(res => {
        console.log('posted', res);
        window.location.href = `/note/${note.id}`;
      })
      .catch(e => console.log(e));
  }

  onAddImage = note => {
    console.log('update', note);
    axios
      .put(`${API_URL}/${note.id}`, note)
      .then(res => {
        console.log('posted', res);
        let notes = res.data;
        let newState = [];
        for (let note in notes) {
          newState.push({
            id: note,
            title: notes[note].title,
            content: notes[note].content,
            files: notes[note].files || []
          });
        }
        this.setState({
          notes: newState
        });
        this.searchNotes('');
      })
      .catch(e => console.log(e));
  }

  onDeleteNote = id => {
    console.log('delete', id);
    axios
      .delete(`${API_URL}/${id}`)
      .then(res => {
        console.log('posted', res);
        window.location.href = '/';
      })
      .catch(e => console.log(e));
  }

  onSearchNotes = (event, term) => {
    event.preventDefault();
    this.searchNotes(term);
  }

  searchNotes = term => {
    let newData = this.state.notes.slice();
    if (term.trim() !== '') {
      term = term.toUpperCase();
      newData = newData.filter((element) => {
        let title = element.title.toUpperCase();
        let content = element.content.toUpperCase();
        return title.includes(term) || content.includes(term);
      } );
    }
    this.setState({searchNotes: newData, searchTerm: term});
  }

  componentDidMount() {
    axios
      .get(API_URL)
      .then(res => {
        let notes = res.data;
        let newState = [];
        for (let note in notes) {
          newState.push({
            id: note,
            title: notes[note].title,
            content: notes[note].content,
            files: notes[note].files || []
          });
        }
        this.setState({
          notes: newState
        });
        this.searchNotes('');
      })
      .catch(e => {
        console.error('Server Error', e);
      });
  }

  render() {
    return (
      <div className="app">
        <Route path="/" render={(props) => <Nav {...props} />} />
        <Route exact path="/" render={(props) => <ListView {...props} notes={this.state.searchNotes} onSearchNotes={this.onSearchNotes} />} />
        <Route exact path="/create" render={(props) => <CreateNewView {...props} onSubmitNote={this.onAddNote} />} />
        <Route exact path="/edit/:noteID" render={(props) => <EditView {...props} notes={this.state.notes} onSubmitNote={this.onUpdateNote} />} />
        <Route exact path="/note/:noteID" render={(props) => <NoteView {...props} notes={this.state.notes} onDeleteNote={this.onDeleteNote} onAddImage={this.onAddImage} />} />
      </div>
    );
  }
}

export default App;
