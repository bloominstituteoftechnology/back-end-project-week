import React, { Component } from 'react';
import './Helper/IconLibrary'; //build custom fontawsome library of icons
import injectSheet from 'react-jss';

import Container from './Navigation/Container';
import Wheel from './Navigation/Wheel';

const styles = {
  root: props => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  })
}

class App extends Component {
  state = {
    isSelectingNote: false,
    selectedNoteId: '',
    isCreatingNote: false,
  }
  handleOpenNote = (id) => {
    this.setState({
      isSelectingNote: true,
      selectedNoteId: id
    })
  }
  handleCloseNote = () => {
    this.setState({
      isSelectingNote: false,
      selectedNoteId: ''
    })
  }
  handleCreateNote = () => {
    this.setState({
      isCreatingNote: true,
      selectedNoteId: Math.floor((Math.random() * 100) + 1)
    })
  }
  handleSaveNote = () => {
    // todo: add new note to db

    // clear the new note
    this.setState({
      isCreatingNote: false,
      selectedNoteId: ''
    })
  }
  render() {
    const { classes } = this.props
    const { isSelectingNote, isCreatingNote, selectedNoteId } = this.state
    return (
      <div className={classes.root}>
        <Container
          handleOpenNote={this.handleOpenNote}
          handleCloseNote={this.handleCloseNote}
          handleSaveNote={this.handleSaveNote}
          isSelectingNote={isSelectingNote}
          isCreatingNote={isCreatingNote}
          selectedNoteId={selectedNoteId}
        />
        <Wheel
          handleCreateNote={this.handleCreateNote}
        />
      </div>
    );
  }
}

export default injectSheet(styles)(App);
