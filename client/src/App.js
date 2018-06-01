import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import { NewNote } from "./components/NewNote";
import { ViewNote } from "./components/ViewNote";
import { EditNote } from "./components/EditNote";
import { SideBar } from "./components/SideBar";
import { Landing } from "./components/Landing";
import DisplayNotes from "./components/DisplayNotes";
// deleteNote = id => {
//   const tempNotes = this.state.notes;
//   const notes = tempNotes.filter(note => note.id !== id);
//   this.setState({ notes });
// };

// updateNote = note => {
//   const notes = this.state.notes;
//   notes.map(item => {
//     if (item.id === parseInt(note.id, 10)) {
//       if (item.title) item.title = note.title;
//       if (item.text) item.text = note.text;
//     }
//   });
//   this.setState({ notes });
// };

// handleExport = () => {
//   let csvExport = "data:text/csv;charset=utf-8, Title,Text,Id\r\n";
//   const exportedNotes = this.state.notes;
//   exportedNotes.forEach(rows => {
//     let row = Object.values(rows).join(". ");
//     csvExport += row + "\r\n";
//   });
//   return encodeURI(csvExport);
// };

// authHandler = authData => {
//   this.setState({ user: authData.user.displayName, isLoggedIn: true });
// };

// authenticate = provider => {
//   const authProvider = new firebase.auth[`${provider}AuthProvider`]();
//   firebaseApp
//     .auth()
//     .signInWithPopup(authProvider)
//     .then(this.authHandler);
// };

// logout = () => {
//   console.log("Logging out!");
//   firebase.auth().signOut();
//   this.setState({ user: null, isLoggedIn: false });
// };

class App extends Component {
  state = {
    notes: [] || ["nothing here"],
    isLoggedIn: false
  };

  // sync to firebase db and update changes live
  componentDidMount() {
    this.getNotes();
  }

  getNotes = () => {
    axios
      .get("http://localhost:5000/api/notes", { withCredentials: true })
      .then(response => {
        this.setState({ notes: response.data.notes });
      })
      .catch(error => {
        console.log(error);
      });
  };

  addNote = data => {
    data = { ...data };
    axios
      .post("http://localhost:5000/api/notes", data, { withCredentials: true })
      .then(response => {
        console.log("Note added");
        this.getNotes();
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateNote = data => {
    const { id } = { ...data };
    const updateData = { ...data };
    console.log(id);
    console.log(data);
    axios
      .put(`http://localhost:5000/api/notes/${id}`, updateData, {
        withCredentials: true
      })
      .then(response => {
        this.getNotes();
      })
      .catch(error => {
        console.log(error);
      });
  };

  deleteNote = id => {
    axios
      .delete(`http://localhost:5000/api/notes/${id}`, {
        withCredentials: true
      })
      .then(response => {
        this.getNotes();
      })
      .catch(error => {
        console.log(error);
      });
  };

  logout = () => {
    axios
      .get("http://localhost:5000/api/users/logout", { withCredentials: true })
      .then(response => {
        console.log("Logged out");
        this.setState({ notes: [], isLoggedIn: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <SideBar logout={this.logout} />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={RegisterForm} />
              <Route
                exact
                path="/displayNotes"
                render={props => (
                  <DisplayNotes {...props} notes={this.state.notes} />
                )}
              />
              <Route
                exact
                path="/createNewNote"
                render={props => <NewNote {...props} addNote={this.addNote} />}
              />
              <Route
                exact
                path="/viewnote/:id"
                render={props => (
                  <ViewNote
                    {...props}
                    notes={this.state.notes}
                    deleteNote={this.deleteNote}
                  />
                )}
              />
              <Route
                exact
                path="/editNote/:id"
                render={props => (
                  <EditNote
                    {...props}
                    notes={this.state.notes}
                    updateNote={this.updateNote}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
