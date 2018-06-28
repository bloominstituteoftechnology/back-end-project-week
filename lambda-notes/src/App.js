import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import { Route, Link } from 'react-router-dom';
import { SignIn, Export, DeleteNote, CreateNote, EditNote, ListNotes, Note } from './components/index';

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    }
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/notes`)
      .then(response => {
        this.setState(() => ({ notes: response.data }));
      })
      .catch(err => {
        console.error('Server error: could not access notes', err)
      })
  }

  render() {
    return (
      <div className="app-container">
        <div className="sidebar">
          <h1>Lambda Notes</h1>
          <Link to="/">
            <button>View Your Notes</button>
          </Link>
          <Link to="/create">
            <button>+ Create New Note</button>
          </Link>
        </div>
        <div>
          <Route exact path="/" render={(props) => <ListNotes {...props} notes={this.state.notes} />} />
          <Route path="/note/:id" render={(props) => <Note {...props} notes={this.state.notes} />} />
          <Route path="/create" render={(props) => <CreateNote {...props} notes={this.state.notes} />} />
          <Route path="/note/:id/edit" render={(props) => <EditNote {...props} notes={this.state.notes} />} />
          <Route path="/note/:id/delete" render={(props) => <DeleteNote {...props} notes={this.state.notes} />} />
          <Route path="/export" render={(props) => <Export {...props} notes={this.state.notes} />} />
          <Route path="/login" render={(props) => <SignIn {...props} notes={this.state.notes} />} />
        </div>
      </div>
    );
  }
}

export default App;
