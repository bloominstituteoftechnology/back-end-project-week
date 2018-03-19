import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addNote, deleteAllNotes } from '../../actions';

import AddNewNote from './AddNewNote';
import SearchBar from './SearchBar';
import Notes from '../Notes//Notes';

import '../../styles/css/index.css';

class AppLoggedIn extends Component {
  state = {
    isAddingNote: false,
    notes: [],
    searchQuery: '',
    disableStatusBarButtons: false,
  };

  componentDidMount() {
    this.setState({
      notes: this.props.notes,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notes.length === this.props.notes.length + 1)
      this.noteAddedSuccessfully(nextProps);

    if (nextProps.notes.length === this.props.notes.length - 1)
      this.updateNotesList(nextProps);

    if (nextProps.notes.length !== this.props.notes.length)
      this.updateNotesList(nextProps);
  }

  updateNotesList = nextProps => {
    this.setState({
      notes: nextProps.notes,
    });
  };

  cancelAddNewButtonClicked = _ => {
    this.setState({ isAddingNote: false });
  };

  addNewNoteButtonClickedHandler = _ => {
    this.setState({ isAddingNote: !this.state.isAddingNote });
  };

  addNoteHandler = note => {
    this.props.addNote(note);
  };

  noteAddedSuccessfully = nextProps => {
    this.setState({
      notes: nextProps.notes,
      isAddingNote: false,
    });
  };

  updateSearchQuery = e => {
    if (!this.state.isAddingNote)
      this.setState({ searchQuery: e.target.value });
  };

  resetQuery = _ => {
    // this.setState({ searchQuery: '' });
    // implement state in search bar to do this
  };

  deleteAllNotes = _ => {
    this.props.deleteAllNotes();
  };

  disableStatusBarButtonsHandler = _ => {
    this.setState({
      disableStatusBarButtons: !this.state.disableStatusBarButtons,
    });
  };

  render() {
    return (
      <div className="AppLoggedIn">
        <header className="AppLoggedInHeader">
          <p className="AppLoggedInHeader__title">Notes&reg;</p>
        </header>

        <div className="AppLoggedInMidStatusBar">
          <div
            className="AppLoggedInMidStatusBar__addNewNoteButton"
            onClick={
              this.state.disableStatusBarButtons
                ? null
                : this.addNewNoteButtonClickedHandler
            }
            style={
              this.state.disableStatusBarButtons
                ? {
                    background: 'white',
                    color: 'black',
                    opacity: '0.2',
                    fontSize: '0.7rem',
                    cursor: 'not-allowed',
                  }
                : null
            }
          >
            {this.state.isAddingNote ? '-' : '+'}
          </div>

          <div className="AppLoggedInMiddleItems">
            <SearchBar
              isAddingNote={this.state.isAddingNote}
              disableStatusBarButtons={this.state.disableStatusBarButtons}
              noNotes={this.state.notes.length === 0}
              updateSearchQuery={this.updateSearchQuery.bind(this)}
              resetQuery={this.resetQuery}
            />
          </div>

          <div
            className="AppLoggedInMidStatusBar__rightItem"
            onClick={
              this.state.isAddingNote ||
              this.state.notes.length === 0 ||
              this.state.disableStatusBarButtons
                ? null
                : this.deleteAllNotes
            }
            style={
              this.state.isAddingNote ||
              this.state.notes.length === 0 ||
              this.state.disableStatusBarButtons
                ? {
                    background: 'white',
                    color: 'black',
                    opacity: '0.2',
                    fontSize: '0.7rem',
                    cursor: 'not-allowed',
                  }
                : null
            }
          >
            {' '}
            &#x2715;
          </div>
        </div>

        {this.state.isAddingNote ? (
          <AddNewNote
            cancelAddNewNoteClickHandler={this.cancelAddNewButtonClicked}
            addNewNoteButtonClickedHandler={this.addNewNoteButtonClickedHandler}
            addNoteHandler={this.addNoteHandler}
            appIsAddingNote={this.state.isAddingNote}
          />
        ) : null}

        {this.state.notes.length > 0 ||
        (this.state.notes.length === 0 && this.state.isAddingNote) ? (
          this.state.isAddingNote ? null : (
            <Notes
              notes={this.state.notes}
              searchQuery={this.state.searchQuery}
              disableStatusBarButtonsHandler={
                this.disableStatusBarButtonsHandler
              }
            />
          )
        ) : (
          <div className="AppLoggedInNoNotesInState">No notes. Add some!</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
  };
};

export default connect(mapStateToProps, { addNote, deleteAllNotes })(
  AppLoggedIn,
);
