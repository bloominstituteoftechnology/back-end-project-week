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
import {
  requireAuth,
  getAccessToken,
  getIdToken,
  isLoggedIn,
  login
} from './utils/AuthService';

const DB_DOMAIN = 'https://lambda-notes-noxasaxon.herokuapp.com/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
  }

  updateServer = newNotes => {
    axios
      .post(
        `${DB_DOMAIN}`,
        { notes: newNotes },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            ID: getIdToken()
          }
        }
      )
      .then(res => {
        console.log(res);
        this.setState({ notes: res.data });
      });
  };

  componentDidMount() {
    if (isLoggedIn()) console.log('logged in');
    else console.log('not logged in');
    axios
      .get(`${DB_DOMAIN}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          ID: getIdToken()
        }
      })
      .then(res => {
        console.log(res);
        this.setState({ notes: res.data });
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

    this.updateServer([
      ...this.state.notes,
      {
        index: this.state.notes.length,
        title: newNote.title,
        content: newNote.content,
        tags: newNote.tags
      }
    ]);
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

    this.updateServer(newNotes);
  };

  deleteNote = indexToDelete => {
    this.state.notes.splice(indexToDelete, 1);
    this.setState({
      notes: [...this.state.notes]
    });

    this.updateServer(this.state.notes);
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

        {isLoggedIn() ? (
          <div>
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
                      this.state.notes[
                        this.props.location.pathname.split('/')[2]
                      ].title
                    }
                    content={
                      this.state.notes[
                        this.props.location.pathname.split('/')[2]
                      ].content
                    }
                    tags={
                      this.state.notes[
                        this.props.location.pathname.split('/')[2]
                      ].tags
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
          </div>
        ) : (
          <div className="yourNotes">
            <h4 onClick={login()}> ...loading </h4>
          </div>
        )}
        <Route path="/callback" component={Callback} />
      </div>
    );
  }
}

export default withRouter(App);
