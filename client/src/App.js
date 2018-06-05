import React, { Component } from "react";
import SideBar from "./components/SideBar/SideBar";
import ListView from "./components/ListView/ListView";
import AddNote from "./components/AddNote/AddNote";
import EditNote from "./components/EditView/EditView";
import { Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
    this.editNote = this.editNote.bind(this);
  }

  update = () => {
    axios
      .get("https://yasin-lambda-notes.herokuapp.com/notes")
      .then(response => {
        console.log(response);
        return this.setState({ notes: response.data });
      })
      .catch(error => console.log(error));
  };
  componentDidMount() {
    this.update();
  }
  editNote = newNote => {
    console.log(newNote);
    let { notes } = this.state;
    const idx = notes.findIndex(el => el.id === newNote.id);
    notes.splice(idx, 1, newNote);
    console.log("editNote state", notes);
    this.setState({ notes: notes });
  };

  deleteNote = id => {
    const newNotes = this.state.notes.filter(note => note.id !== Number(id));
    this.setState({ notes: newNotes });
    console.log("from app -- delete", newNotes);
  };

  render() {
    return (
      <div className="App">
        <SideBar />
        <Route exact path="/" component={ListView} />
        <Route path="/Add-Note" component={AddNote} />
        <Route path="/Edit-Note/:index" component={EditNote} />
      </div>
    );
  }
}
