import React, { Component } from "react";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-wrapper">
        <div className="headline-wrapper">
          Lambda <br /> Notes
        </div>
        <Link to="/notes" className="link2">
          <div className="button noteslist-home-button">View Your Notes</div>
        </Link>
        <Link to="/create" className="link2">
          <div className="button create-note-button">Create New Note</div>
        </Link>
        <Link to="/login" className="link2">
          <div className="button create-note-button" onClick={this.signout}>
            Signout
          </div>
        </Link>
      </div>
    );
  }
  signout = () => {
    localStorage.removeItem("jwt");
  };
}

export default Sidebar;
