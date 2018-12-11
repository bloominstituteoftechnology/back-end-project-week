import React, { Component } from "react";
import "./App.css";
import { withRouter, Route } from "react-router-dom";

import axios from "axios";
import Notes from "./components/Notes";
import SideBar from "./components/SideBar";
import NoteForm from "./components/NoteForm";
import SingleNote from "./components/SingleNote";
import EditNote from "./components/EditNote";
import MobileNav from "./components/MobileNav";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      singleNoteId: "",
      loggedIn: false
    };
    this.api = "http://localhost:9000/api/notes";
  }
  authenticate = () => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        authentication: token,
        id: localStorage.getItem("userID")
      }
    };
    if (token) {
      axios.get(this.api, options).then(res => {
        if (res.status === 200 && res.data) {
          this.setState({ loggedIn: true, notes: res.data });
        } else {
          this.props.history.push("/login");
        }
      });
    } else {
      this.props.history.push("/login");
    }
  };

  componentWillMount() {
    // axios.get(this.api).then(res => this.setState({ notes: res.data }));
    this.authenticate();
  }

  handleAddNewNote = () => {
    axios.get(this.api).then(res =>
      this.setState({
        notes: res.data
      })
    );
  };
  handleDeleteNote = () => {
    axios.get(this.api).then(res =>
      this.setState({
        notes: res.data
      })
    );
  };
  setNotes = () => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        authentication: token,
        id: localStorage.getItem("userID")
      }
    };
    axios.get(this.api, options).then(res => {
      this.setState({
        notes: res.data
      });
    });
  };
  handleEditNote = () => {
    axios.get(this.api).then(res =>
      this.setState({
        notes: res.data
      })
    );
  };

  routeToSingleNote = noteId => {
    // this.setState({
    //   singleNoteId: noteId
    // });

    localStorage.setItem("noteID", noteId);
  };
  render() {
    return (
      <div className="App">
        <Route path="/" component={SideBar} />
        <Route path="/" component={MobileNav} />
        <Route
          exact
          path="/"
          render={props => (
            <Notes
              notes={this.state.notes}
              routeToSingleNote={this.routeToSingleNote}
              {...props}
              auth={this.authenticate}
            />
          )}
        />
        <Route
          exact
          path="/notes/:id"
          render={props => (
            <SingleNote
              {...props}
              singleNoteId={this.state.singleNoteId}
              handleDeleteNote={this.handleDeleteNote}
              handleEditNote={this.handleEditNote}
            />
          )}
        />
        <Route
          exact
          path="/add"
          render={props => (
            <NoteForm {...props} handleAddNewNote={this.handleAddNewNote} />
          )}
        />
        <Route
          exact
          path="/notes/:id/edit"
          render={props => (
            <EditNote handleEditNote={this.handleEditNote} {...props} />
          )}
        />
        <Route
          exact
          path="/register"
          render={props => <Register {...props} />}
        />
        <Route
          exact
          path="/login"
          render={props => (
            <Login
              auth={this.authenticate}
              setNotes={this.setNotes}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
