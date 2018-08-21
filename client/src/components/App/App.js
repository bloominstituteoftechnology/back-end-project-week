import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListView from '../Page/ListView';
import CreateNewView from '../Page/CreateNewView';
import EditView from '../Page/EditView';
import NoteView from '../Page/NoteView';
import Nav from '../Nav';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8000/notes';

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
      newData = newData.filter((element) => {
        return element.title.includes(term) || element.content.includes(term);
      } );
    }
    this.setState({searchNotes: newData, searchTerm: term});
  }

  componentDidMount() {
    axios
      .get(API_URL)
      .then(res => {
        this.setState(() => ({ notes: res.data }));
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
        <Route exact path="/note/:noteID" render={(props) => <NoteView {...props} notes={this.state.notes} onDeleteNote={this.onDeleteNote} />} />
      </div>
    );
  }
}

export default App;
