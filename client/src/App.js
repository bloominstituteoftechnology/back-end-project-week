import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import NoteList from './components/NoteList';
import EditNote from './components/EditNote';
import Note from './components/Note';
import NewNote from './components/NewNote';
import LoginPage from './components/LoginPage';
import { connect } from 'react-redux';
import { addNote, deleteNote, fetchNotes } from './actions';


class App extends Component {

  doLogout() {
    localStorage.setItem('uuID', '');
    window.location = '/';
  }

  async componentWillMount() {
    const uuID = localStorage.getItem('uuID');
    await this.props.fetchNotes(uuID);
  }

  render() {
    return (
      <Router>
        <div className="App" id="App">
          <div className="Sidebar">
            <div className="Sidebar__header">
              Lambda Notes
            </div>
            <Link className="Sidebar__button" to='/'>
              View Your Notes
            </Link>
            <Link className="Sidebar__button" to='/new'>
              + Create New Note
            </Link>
          </div>
          <div className="View">
            <Route path="/" render={() => <NoteList/>} exact/>
            <Route path="/new" component={ NewNote } exact />
            {
              this.props.notes.map(note => {
                return <Route key={note.id} path={`/note/${note.id}`} render={() => <Note note={note}/>}/>;
              })
            }
            {
              this.props.notes.map(note => {
                return <Route key={note.id} path={`/note/edit/${note.id}`} render={() => <EditNote note={note}/>}/>;
              })
            }
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    authed: state.authed,
  }
}

export default connect(mapStateToProps, { addNote, fetchNotes })(App);