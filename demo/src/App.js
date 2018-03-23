import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthService from './components/auth';
import withAuth from './components/withAuth';
import NoteBox from './components/note-box';
const Auth = new AuthService();

// this is the component that will render the users information (notes)
// i probably need to add an additonal property to the user to store note data for that user
  // this property will be an array of note objects
  // then when i call 'getNotes' i will go into the users database and search for their info and note data

class App extends Component {

  componentWillMount() {
    Auth.getNotes();
  }

  handleLogout() {
    Auth.logout()
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <div className="note-center">
          <h2 className="card">Welcome {this.props.user.username}</h2>
        </div>
        <NoteBox />
        <div className="note-center">
          <div className="card">
            <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>LOGOUT</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(App);