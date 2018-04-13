import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Notes from "./Notes";
import { updateSelected, getNotes } from "../actions";

class MainView extends Component {
  componentDidMount() {
    this.props.getNotes(this.props.user);
  }

  render() {
    return (
      <div className="MainView">
        <div className="header" />
        <h2>Your Notes:</h2>
        <div className="Notes">
          {this.props.notes.map(note => {
            return (
              <form>
                <Notes
                  key={note._id}
                  note={note}
                />
                {note.selected ? (
                  <Redirect to={`/note/${note._id}`} />
                ) : (
                  console.log("not going through redirect")
                )}
              </form>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { updateSelected, getNotes })(MainView);
