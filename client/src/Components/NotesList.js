import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";
import IndivNote from "./IndivNote";

const token = localStorage.getItem("jwt");
const requestOptions = {
  headers: {
    Authorization: token
  }
};
class NotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [{}]
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5555/api/notes", requestOptions)

      .then(response => {
        this.setState(response.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  // componentWillUnmount() {
  //   window.location.reload(true);
  // }

  signout = () => {
    localStorage.removeItem("jwt");
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="noteslist-wrapper-with-sidebar">
        <Sidebar />
        <div className="noteslist-page-wrapper minus-sidebar">
          {/* <div className="log-out-button" onClick={this.signout}>
            Log Out
          </div> */}
          <h3 className="page-header">Your Notes</h3>
          <ul className="noteslist-wrapper">
            {!localStorage.getItem("jwt") && (
              <div className="please-signin">
                <Link className="link-style" to="/login">
                  <h3>Please Sign in to access your notes</h3>
                </Link>
              </div>
            )}
            {this.state.notes.map(item => {
              return (
                <li className="indiv-note" key={item.title + item.content}>
                  <Link
                    className="note-body"
                    to={{
                      pathname: `notes/${item._id}`,
                      state: {
                        id: item._id,
                        title: item.title,
                        content: item.content
                      }
                    }}
                  >
                    <IndivNote
                      title={item.title}
                      content={item.content}
                      id={item._id}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default NotesList;
