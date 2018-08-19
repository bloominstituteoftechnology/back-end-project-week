import React, { Component } from "react";
import "./index.css";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";

import Login from "./Components/Login";
import Register from "./Components/Register";
import NotesList from "./Components/NotesList";
import CreateNote from "./Components/CreateNote";
import EditNote from "./Components/EditNote";
import SingleNoteView from "./Components/SingleNoteView";

class App extends Component {
  render() {
    return (
      <div className="App">
        {!localStorage.getItem("jwt") ? (
          <div>
            <Link className="link" to="/login">
              <h3>Please Sign in to view content</h3>
            </Link>
          </div>
        ) : (
          <Switch>
            <Route exact path="/notes" component={NotesList} />
            <Route exact path="/notes/:id" component={SingleNoteView} />
            <Route exact path="/notes/edit/:id" component={EditNote} />
            <Route exact path="/create" component={CreateNote} />
          </Switch>
        )}
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    );
  }
}

export default App;
