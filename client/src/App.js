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
    sideBarComponent: '',
    isAuthenticate: false,
  }
  handleOpenNote = (_id) => {
    this.setState({
      isSelectingNote: true,
      selectedNoteId: _id
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
    if (componentName === 'tags' || componentName === 'lists' || componentName === 'account') {
      this.setState((prevState) => ({ showSideBar: false, sideBarComponent: componentName }))
    } else {
      this.setState({ showSideBar: false })
    }
    setTimeout(() => {
      this.setState({ showSideBar: true })
    }, 300)

  }
  handleCloseSideBar = () => {
    this.setState({ showSideBar: false })
  }
  handleCompleteSignIn = () => {
    this.setState({ isAuthenticate: true })
  }
  componentDidMount = () => {
    let token = sessionStorage.getItem('jwtToken');
    if (!token || token === '') {//if there is no token, dont bother
      this.setState({ showSideBar: true, sideBarComponent: 'account' })
      //todo: handle message
      console.log('Please sign in to see your notes.')
      return;
    }
    this.autoSignIn(token)
  }
  autoSignIn = (token) => {
    const payload = JSON.stringify({ token })
    fetch('/api/user/revisit', {
      method: 'post',
      body: payload,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({ isAuthenticate: true })
          })
        } else {
          sessionStorage.removeItem('jwtToken');
          this.setState({ showSideBar: true, sideBarComponent: 'account' })
          //todo: show err message to user
          console.log('Unable to auto-sign in. Try signing in manually.')
        }
      })
      .catch(err => {
        sessionStorage.removeItem('jwtToken');
        //todo: show err message to user
        console.log(err)
      })
  }
  render() {
    const { classes } = this.props
    const { isSelectingNote, isCreatingNote, selectedNoteId, showSideBar, sideBarComponent, isAuthenticate } = this.state
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
          isAuthenticate={isAuthenticate}
        />
        <Wheel
          handleCreateNote={this.handleCreateNote}
          openSideBar={this.openSideBar}
        />
        {showSideBar ?
          <SideBar componentName={sideBarComponent} handleCompleteSignIn={this.handleCompleteSignIn} />
          :
          ''
        }
      </div>
    );
  }
}

export default injectSheet(styles)(App);
