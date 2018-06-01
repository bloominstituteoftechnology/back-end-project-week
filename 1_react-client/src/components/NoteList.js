import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import NoteCard from "./NoteCard";

import "./NoteList.css";

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
    // search function
    let filteredNotes = this.state.notes.filter(note => {
      return (
        note.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1 ||
        note.content.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1
      );
    });

    // alert if not logged in
    this.state.isUnauthorized
      ? alert("Please log-in first to view your notes.")
      : null;

    return (
      <div>
        <nav className="NavBar">
          <div className="Nav-left">
            <h3>
              <a class="active" href="/notes">
                Home
              </a>
            </h3>
            <h3>
              <a href="#contact">Contact</a>
            </h3>
            <h3>
              <a href="#support">Support</a>
            </h3>
          </div>

          <div className="Nav-middle">
            <input
              className="SearchBar_Input"
              placeholder="Search note"
              type="text"
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
            />
          </div>

          <div className="Nav-right">
            <h3>
              <a href="/login" onClick={this.signOutHandler}>
                Sign out
              </a>
            </h3>
          </div>
        </nav>

        <body className="NoteList-body">
          <h1 className="YourNotes">Your Notes:</h1>
          <div className="NoteList-card">
            {filteredNotes.map(eachNote => (
              <div key={eachNote._id} className="NoteList-card">
                <Link
                  to={`/notes/${eachNote._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <NoteCard eachNote={eachNote} props={this.props} />
                </Link>
              </div>
            ))}
          </div>
        </body>
      </div>
    );
  }
}
