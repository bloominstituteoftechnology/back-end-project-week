import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Notes from "./Notes";
import { updateSelected } from "../actions";

class MainView extends Component {
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
                  key={note.id}
                  note={note}
                />
                {note.selected ? (
                  <Redirect to={`/note/${note.id}`} />
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
    notes: state
  };
};

export default connect(mapStateToProps, { updateSelected })(MainView);
