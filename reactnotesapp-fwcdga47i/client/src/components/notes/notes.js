import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNotes } from '../../actions';

import Note from './note';
import NoteStatusBar from './noteStatusBar';

class Notes extends Component {
  state = {
    notes: [],
  };

  componentWillMount() {
    if (this.props.error) {
      window.alert(this.props.error);
      this.props.history.push('/login');
      return;
    }

    this.props.getNotes();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      window.alert(nextProps.error);
      this.props.history.push('/login');
      return;
    }

    if (nextProps.notes.length !== this.state.lengths) {
      this.setState({ notes: nextProps.notes });
    }
  }

  filterNotes = id => {
    this.setState({ notes: this.state.notes.filter(note => note._id === id) });
  };

  restoreNotes = _ => {
    this.setState({ notes: this.props.notes });
  };

  render() {
    return (
      <div className="Notes">
        {this.state.notes.map(note => {
          return (
            <div className="NoteContainer" key={note._id}>
              <NoteStatusBar
                id={note._id}
                filterNotes={this.filterNotes}
                restoreNotes={this.restoreNotes}
              />

              <Note note={note} />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, { getNotes })(Notes);
