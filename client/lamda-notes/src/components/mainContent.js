import React, { Component } from "react";
import "../style/mainContent.css";
import NotesList from "../components/noteList";
import NoteView from "../components/noteView";
import CreateNote from "../components/createNote";
import EditNote from "../components/editNote";
import { Route, Switch } from "react-router-dom";

class MainContent extends Component {
  render() {
    return (
      <div className="main_container">
        <Switch>
          <Route path="/" exact component={NotesList} />
          <Route path="/note/:id" exact component={NoteView} />
          <Route path="/create" exact component={CreateNote} />
          <Route path="/edit/:id" exact component={EditNote} />
        </Switch>
      </div>
    );
  }
}

export default MainContent;
