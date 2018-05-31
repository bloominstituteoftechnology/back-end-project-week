import React, { Component } from "react";

import { Link } from "react-router-dom";
import axios from 'axios'; 

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noteTitle: "",
      noteBody: "",
      notes: []
    };
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    const newObj = {

      noteTitle: this.state.title,
      noteBody: this.state.content
    };
    // console.log("From create.js handleSubmit...", newObj);
    axios.post('https://boiling-wildwood-28100.herokuapp.com/notes', newObj)
    .then(resp => this.props.update())
    .catch(err => console.log(err))

  }


  render() {
    return (
      <div className="container1">
        <div className="form-container">
          <div className="edit-heading-text">Edit Note:</div>
          <form onSubmit={this.handleSubmit} action="submit">
            <input
              type="text"
              name="title"
              value={this.state.title}
              placeholder="Note Title"
              onChange={this.handleChange}
            />
            <textarea
              placeholder="Note Content"
              rows="15"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </form>
          <Link to="/">
            <div className="save-button" onClick={this.handleSubmit}>
              Save
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
