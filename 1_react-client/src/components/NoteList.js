import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import NoteCard from "./NoteCard";

export default class NoteList extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      isUnauthorized: false,
      pwShowToggle: false,
      search: ""
    };
  }

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    const authToken = `${token}`;
    const requestOption = {
      headers: {
        Authorization: authToken
      }
    };

    axios
      .get("http://localhost:5000/api/notes", requestOption)
      .then(response => {
        this.setState({ isUnauthorized: false });
        this.setState({ notes: response.data });
        this.props.history.push("/notes");
      })
      .catch(err => {
        this.setState({ isUnauthorized: true });
        this.props.history.push("/login");
      });
  };

  signOutHandler = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  render() {
    let filteredNotes = this.state.notes.filter(note => {
      return (
        note.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1 ||
        note.content.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1
      );
    });

    return (
      <div>
        {this.state.isUnauthorized
          ? alert("Please log-in first to view your notes.")
          : null}

        <button onClick={this.signOutHandler}>Sign out</button>
        <br />
        <br />
        <input
          className="SearchBar_Input form-control"
          placeholder="Search note"
          type="text"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        />
        <h1>Your Notes:</h1>
        {filteredNotes.map(eachNote => (
          <div key={eachNote._id}>
            <Link
              to={`/notes/${eachNote._id}`}
              style={{ textDecoration: "none" }}
            >
              <NoteCard eachNote={eachNote} props={this.props} />
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
