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
      loggedIn: false,
      options: {
        headers: {
          Authorization: localStorage.getItem("token"),
          id: localStorage.getItem("userID")
        }
      }
    };
    this.api = "http://localhost:9000/api/notes";
  }
  // options = () => {
  //   const token = localStorage.getItem("token");
  //   const api = {
  //     headers: {
  //       authentication: token,
  //       id: localStorage.getItem("userID")
  //     }
  //   };
  // };

  authenticate = () => {
    const token = this.state.options.headers.Authorization;
    if (token) {
      axios.get(this.api, this.state.options).then(res => {
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

  componentDidMount() {
    // axios.get(this.api).then(res => this.setState({ notes: res.data }));
    this.authenticate();
  }

  // handleAddNewNote = () => {
  //   // const token = localStorage.getItem("token");
  //   // const options = {
  //   //   headers: {
  //   //     authentication: token,
  //   //     id: localStorage.getItem("userID")
  //   //   }
  //   // };
  //   axios.get(this.api, this.state.options).then(res =>
  //     this.setState({
  //       notes: res.data
  //     })
  //   );
  // };
  // handleDeleteNote = () => {
  //   const token = localStorage.getItem("token");
  //   const options = {
  //     headers: {
  //       authentication: token,
  //       id: localStorage.getItem("userID")
  //     }
  //   };
  //   axios.get(this.api, options).then(res =>
  //     this.setState({
  //       notes: res.data
  //     })
  //   );
  // };
  setNotes = () => {
    axios.get(this.api, this.state.options).then(res => {
      this.setState({
        notes: res.data
      });
    });
  };
  // handleEditNote = () => {
  //   const token = localStorage.getItem("token");
  //   const options = {
  //     headers: {
  //       authentication: token,
  //       id: localStorage.getItem("userID")
  //     }
  //   };
  //   axios.get(this.api, options).then(res =>
  //     this.setState({
  //       notes: res.data
  //     })
  //   );
  // };

  routeToSingleNote = noteId => {
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
              // handleDeleteNote={this.handleDeleteNote}
              setNotes={this.setNotes}
              options={this.state.options}
            />
          )}
        />
        <Route
          exact
          path="/add"
          render={props => <NoteForm {...props} setNotes={this.setNotes} />}
        />
        <Route
          exact
          path="/notes/:id/edit"
          render={props => (
            <EditNote
              setNotes={this.setNotes}
              options={this.state.options}
              {...props}
            />
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
          render={props => <Login setNotes={this.setNotes} {...props} />}
        />
      </div>
    );
  }
}

export default withRouter(App);
