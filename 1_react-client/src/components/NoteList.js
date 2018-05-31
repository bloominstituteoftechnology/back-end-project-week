import React, { Component } from "react";
import axios from "axios";

export default class NoteList extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      isUnauthorized: false,
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

  render() {
    // console.log("Local Storage On NoteList", this.token);
    return (
      <div>
        {this.state.isUnauthorized
          ? alert("Please log-in first to view your notes.")
          : null}

        <button onClick={this.signOutHandler}>Sign out</button>

        <h1>Your Notes:</h1>
        {this.state.notes.map(eachNote => (
          <div key={eachNote.id}>
            <h4>{eachNote.title}</h4>
            <p>{eachNote.content}</p>
          </div>
        ))}
      </div>
    );
  }
}
