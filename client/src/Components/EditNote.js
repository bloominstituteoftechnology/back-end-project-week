import React, { Component } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const token = localStorage.getItem("jwt");
const requestOptions = {
  headers: {
    Authorization: token
  }
};

class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState(this.props.location.state);
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = () => {
    axios
      .put(
        `http://localhost:5555/api/notes/${this.state.id}`,
        this.state,
        requestOptions
      )
      .then(response => {
        this.props.history.push("/notes");
      });
  };

  render() {
    console.log(this.state);
    return (
      <div className="create-note-app-page">
        <Sidebar />
        <div className="formContainer">
          <div className="create-note-wrapper">
            <h3>Edit Note</h3>
            <div className="new-note-wrapper">
              <label className="label">Note Title:</label>
              <input
                className="input-title"
                placeholder="note title"
                onChange={this.handleChange}
                name="title"
                type="text-area"
                value={this.state.title}
              />
            </div>
            <div className="new-note-wrapper">
              <label className="label">Note Body:</label>
              <textarea
                className="input-body"
                placeholder="note content"
                onChange={this.handleChange}
                name="content"
                type="text-area"
                value={this.state.content}
              />
            </div>
            <button className="button" onClick={this.handleClick}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditNote;
