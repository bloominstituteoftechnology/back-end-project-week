import React, { Component } from 'react';
import './Helper/IconLibrary'; //build custom fontawsome library of icons
import injectSheet from 'react-jss';

import Container from './Navigation/Container';
import Wheel from './Navigation/Wheel';
import SideBar from './SideBar/SideBar';

const styles = {
}

class App extends Component {
  state = {
    isSelectingNote: false,
    selectedNoteId: '',
    isCreatingNote: false,
    showSideBar: false,
  }
  handleOpenNote = (id) => {
    this.setState({
      isSelectingNote: true,
      selectedNoteId: id
    })
  }
  handleCloseNote = () => {
    //to-do: save the closed note's data
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
  openSideBar = (componentName) => {
    if (componentName === 'tags' || componentName === 'lists') {
      this.setState((prevState) => ({ showSideBar: !prevState.showSideBar }))
    } else {
      this.setState({ showSideBar: false })
    }
  }
  handleCloseSideBar = () => {
    this.setState({ showSideBar: false })
  }
  render() {
    const { classes } = this.props
    const { isSelectingNote, isCreatingNote, selectedNoteId, showSideBar } = this.state
    return (
      <div>
        <Container
          handleOpenNote={this.handleOpenNote}
          handleCloseNote={this.handleCloseNote}
          handleSaveNote={this.handleSaveNote}
          isSelectingNote={isSelectingNote}
          isCreatingNote={isCreatingNote}
          selectedNoteId={selectedNoteId}
          showSideBar={showSideBar}
          handleCloseSideBar={this.handleCloseSideBar}
        />
        <Wheel
          handleCreateNote={this.handleCreateNote}
          openSideBar={this.openSideBar}
        />
        {showSideBar ?
          <SideBar />
          :
          ''
        }
      </div>
    );
  }
}

export default injectSheet(styles)(App);
