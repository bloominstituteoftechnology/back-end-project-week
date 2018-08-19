import React, { Component } from "react";
import Sidebar from "./Sidebar";
import IndivNote from "./IndivNote";
import { Link } from "react-router-dom";
import axios from "axios";

const token = localStorage.getItem("jwt");
const requestOptions = {
  headers: {
    Authorization: token
  }
};

class SingleNoteView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: this.props.location.state
    };
  }

  delete = () => {
    axios
      .delete(
        `http://localhost:5555/api/notes/${this.state.note.id}`,
        requestOptions
      )
      .then(this.props.history.push("/notes"))
      .catch(err => console.log(err));
  };

  signout = () => {
    localStorage.removeItem("jwt");
    this.props.history.push("/login");
  };

  render() {
    //console.log(this.state);
    return (
      <div className="indiv-note-single">
        <Sidebar />
        <div className="indiv-note-container">
          <div className="single-note-nav-bar">
            <div className="nav">
              <Link
                className="link link2"
                to={{
                  pathname: `/notes/edit/${this.state.note.id}`,
                  state: {
                    title: this.state.note.title,
                    content: this.state.note.content,
                    id: this.state.note.id
                  }
                }}
              >
                Edit
              </Link>
            </div>
            <div className="nav" onClick={this.delete}>
              Delete
            </div>
            {/* <div className="nav" onClick={this.signout}>
              Log Out
            </div> */}
          </div>
          <IndivNote
            title={this.state.note.title}
            content={this.state.note.content}
          />
        </div>
      </div>
    );
  }
}

export default SingleNoteView;
