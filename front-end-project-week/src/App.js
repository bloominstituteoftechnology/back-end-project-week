import React, { Component } from 'react';
import ListNotes from './components/ListNotes/ListNotes';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import CreateNote from './components/CreateNote/CreateNote';
import ViewNote from './components/ViewNote/ViewNote';
import Callback from './components/Callback/Callback';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { requireAuth, getAccessToken, getIdToken } from './utils/AuthService';

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    // axios.get('http://localhost:5000')
    // const cachedHits = localStorage.getItem(this.props.user);
    // if (!JSON.parse(cachedHits)) console.log('invalid json confirmed');
    // if (cachedHits) {
    //   this.setState({ notes: JSON.parse(cachedHits) });
    //   return;
    // } else {
    //   localStorage.setItem(this.props.user, this.state.notes);
    // }
    axios
      .get('http://localhost:5000/', {
        headers: { Authorization: `Bearer ${getAccessToken()}` }
      })
      .then(res => {
        console.log(res);
        console.log(getAccessToken());
      })
      .catch(err => {
        //user is not logged in to auth0
        console.log(`Error: Log in to Auth0 for access to notes ${err}`);
      });
  }

  addNewNote = newNote => {
    this.setState({
      notes: [
        ...this.state.notes,
        {
          index: this.state.notes.length,
          title: newNote.title,
          content: newNote.content,
          tags: newNote.tags
        }
      ]
    });

    localStorage.setItem(
      this.props.user,
      JSON.stringify([
        ...this.state.notes,
        {
          index: this.state.notes.length,
          title: newNote.title,
          content: newNote.content,
          tags: newNote.tags
        }
      ])
    );
  };

  updateNote = updatedNote => {
    let newNotes = this.state.notes;
    newNotes[updatedNote.index] = {
      index: updatedNote.index,
      title: updatedNote.title,
      content: updatedNote.content,
      tags: updatedNote.tags
    };
    this.setState({ notes: newNotes });
    localStorage.setItem(this.props.user, JSON.stringify(newNotes));
  };

  deleteNote = indexToDelete => {
    this.state.notes.splice(indexToDelete, 1);
    this.setState({
      notes: [...this.state.notes]
    });
    localStorage.setItem(this.props.user, JSON.stringify(this.state.notes));
  };

  reorder = notesArr => {
    this.setState({
      notes: notesArr
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar
          notes={this.state.notes}
          returnToLogin={this.props.returnToLogin}
        />
        <Route
          exact
          path="/"
          onEnter={requireAuth}
          render={() => (
            <ListNotes
              name={this.props.user}
              notes={this.state.notes}
              reorder={this.reorder}
            />
          )}
        />
        <Route
          path="/viewNote/:id"
          onEnter={requireAuth}
          render={() =>
            this.state.notes[this.props.location.pathname.split('/')[2]] ? (
              <ViewNote
                index={this.props.location.pathname.split('/')[2]}
                title={
                  this.state.notes[this.props.location.pathname.split('/')[2]]
                    .title
                }
                content={
                  this.state.notes[this.props.location.pathname.split('/')[2]]
                    .content
                }
                tags={
                  this.state.notes[this.props.location.pathname.split('/')[2]]
                    .tags
                }
                update={this.updateNote}
                delete={this.deleteNote}
              />
            ) : null
          }
        />
        <Route
          onEnter={requireAuth}
          path="/newNote"
          render={() => <CreateNote addNote={this.addNewNote} />}
        />
        <Route path="/callback" component={Callback} />
      </div>
    );
  }
}

export default withRouter(App);
