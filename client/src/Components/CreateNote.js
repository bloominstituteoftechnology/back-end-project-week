import React, { Component } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

const token = localStorage.getItem("jwt");
const requestOptions = {
  headers: {
    Authorization: token
  }
};

class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = () => {
    axios
      .post("http://localhost:5555/api/notes", this.state, requestOptions)
      .then(response => {
        this.props.history.push("/notes");
      });
  };

  render() {
    console.log(this.state);
    return (
      <div className="create-note-app-page">
        <Sidebar />
        {!localStorage.getItem("jwt") ? (
          <div className="please-signin">
            <Link className="link-style" to="/login">
              <h3>Please Sign in to create a note</h3>
            </Link>
          </div>
        ) : (
          <div className="formContainer">
            <div className="create-note-wrapper">
              <h3>Create a New Note</h3>
              <div className="new-note-wrapper">
                <input
                  className="input-title"
                  placeholder="title"
                  onChange={this.handleChange}
                  name="title"
                  type="text-area"
                  value={this.state.title}
                />
              </div>
              <div className="new-note-wrapper">
                <textarea
                  className="input-body"
                  placeholder="content"
                  onChange={this.handleChange}
                  name="content"
                  type="text-area"
                  value={this.state.content}
                />
              </div>
              <div className="button login-button" onClick={this.handleClick}>
                Save
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CreateNote;
