import React, { Component } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Notesview from "./components/Notesview";
import CreateNote from "./components/InputNote";
import SingleNote from "./components/SingleNote";
import { Route, Switch, Redirect } from "react-router-dom";
import fileDownload from "js-file-download";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";

class App extends Component {
  // what a note object looks like { title: string, body: string(maybe markdown formatted), id: num, checklist: [{checked: boolee, name:string}], tags: [{id:string, text:string}] }
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      mode: "ADD",
      loggedin: false,
      JWT: null
    };
  }
  changeloggedin = () => {
    const JWT = localStorage.getItem("JWT");
    this.setState(
      {
        loggedin: !this.setState.loggedin,
        JWT: JWT
      },
      async () => {
        await this.getNotesList();
      }
    );
  };
  formatForDB = noteObj => {
    noteObj.userID = this.state.userID;
    noteObj.checklist = JSON.stringify(noteObj.checklist);
    noteObj.tags = JSON.stringify(noteObj.tags);
    return noteObj;
  };
  addNote = noteObj => {
    noteObj = this.formatForDB(noteObj);
    axios
      .post(`${process.env.URL ||"http://localhost:9001/"}notes`, noteObj, {
        headers: { Authorization: `bearer ${this.state.JWT}` }
      })
      .then(response => {
        // handle success
        let prevNotes = [...this.state.notes];
        prevNotes.push(response.data);
        this.setState({
          notes: prevNotes
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };
  editNote = noteObj => {
    noteObj = this.formatForDB(noteObj);
    axios
      .post(`${process.env.URL ||"http://localhost:9001/"}notes/${noteObj.id}`, noteObj, {
        headers: { Authorization: `bearer ${this.state.JWT}` }
      })
      .then(response => {
        let prevNotes = this.state.notes.slice();
        const moddedArray = prevNotes.map(e => {
          if (e.id === response.data.id) {
            e.title = response.data.title;
            e.body = response.data.body;
            e.tags = response.data.tags;
            e.checklist = response.data.checklist;
            return e;
          } else {
            return e;
          }
        });
        this.setState({
          notes: moddedArray
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };
  deleteNote = noteID => {
    axios
      .delete(`${process.env.URL ||"http://localhost:9001/"}notes/${noteID}`, {
        headers: { Authorization: `bearer ${this.state.JWT}` }
      })
      .then(() => {
        this.getNotesList();
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  invertCheck = (itemID, checkName) => {
    let prevNote = this.state.notes.slice();
    prevNote.forEach((e, i) => {
      if (e.id === itemID) {
        e.checklist.map(element => {
          if (element.name === checkName) {
            element.checked = !element.checked;
            return element;
          } else {
            return element;
          }
        });
        this.editNote(e);
      }
    });
  };
  //this is to allow rearrangement via drag and drop of cards
  changeOrder = newOrderProp => {
    this.setState({
      notes: newOrderProp
    });
  };

  jsonToCSV = () => {
    //https://stackoverflow.com/questions/8847766/how-to-convert-json-to-csv-format-and-store-in-a-variable
    const items = this.state.notes;
    const replacer = (key, value) => (value === null ? "" : value);
    const header = Object.keys(items[0]);
    let csv = items.map(row =>
      header
        .map(fieldName => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );
    csv.unshift(header.join(","));
    csv = csv.join("\r\n");
    fileDownload(csv, "data.csv");
  };

  getNotesList = () => {
    axios
      .get(`${process.env.URL ||"http://localhost:9001/"}notes`, {
        headers: { Authorization: `bearer ${this.state.JWT}` }
      })
      .then(response => {
        // handle success
        this.setState({
          notes: response.data
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.loggedin !== prevState.loggedin) {
    }
  };
  componentDidMount = () => {
    if (localStorage.getItem("JWT") !== null && !this.state.loggedin) {
      const JWT = localStorage.getItem("JWT");
      this.setState({ JWT: JWT });
      this.changeloggedin();
    }
  };
  render() {
    return (
      <div className="App">
        {this.state.loggedin ? (
          <div className="container">
            <Sidebar export={this.jsonToCSV} />
            <Switch className="switch">
              <Route
                exact
                path="/input"
                render={props => (
                  <CreateNote
                    add={this.addNote}
                    {...props}
                    mode={this.state.mode}
                  />
                )}
              />
              <Route
                exact
                path="/input/:id"
                render={props => (
                  <CreateNote
                    edit={this.editNote}
                    {...props}
                    notes={this.state.notes}
                  />
                )}
              />
              <Route
                exact
                path="/notes/:id"
                render={props => (
                  <SingleNote
                    {...props}
                    add={this.addNote}
                    notes={this.state.notes}
                    delete={this.deleteNote}
                    invert={this.invertCheck}
                  />
                )}
              />
              <Route
                path="/notes"
                render={props => (
                  <Notesview
                    {...props}
                    notes={this.state.notes}
                    changeStateOrder={this.changeOrder}
                  />
                )}
              />
              <Redirect from="/*" to="/notes" />
            </Switch>
          </div>
        ) : (
          <Switch className="switch">
            <Route
              path="/register"
              render={props => (
                <Register {...props} />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <Login logchange={this.changeloggedin} {...props} />
              )}
            />
            <Redirect from="/*" to="/login" />
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
