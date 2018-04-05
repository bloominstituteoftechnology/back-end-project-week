import React, { Component } from 'react';
import { viewNote } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NoteList extends Component {
  state = {
    id: '',
  };
  componentDidMount() {
    this.props.viewNote();
  }

  render() {
    return (
      <div className="note-container">
        <h3 className="heading">Your Notes:</h3>
        <ul>
          {this.props.notes.map((note, id) => {
            return (
              <li className="note-container notelist" key={id}>
                <Link
                  className="unstyledlink"
                  to={`/note/${note.id}`}
                  onClick={this.viewSingleNote}
                >
                  <h4>{note.title}</h4> <hr /> <p>{note.text}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  viewSingleNote = note => {
    this.viewNote(note);
    this.setState({ id: note.id });
  };
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
  };
};

export default connect(mapStateToProps, { viewNote })(NoteList);
