import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import injectSheet from 'react-jss';
import posed from 'react-pose';

import Lottie from 'react-lottie';
import * as supernote from '../supernote.json';

import Notes from '../Note/Notes';
import SelectedNote from '../Note/SelectedNote';
import NewNote from '../Note/NewNote';
import ExportNotes from '../Note/ExportNotes';

const styles = {
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    padding: '0 5%',
  },
  lottieRoot: {
    marginTop: '10%'
  },
  marginBottom: {
    marginBottom: '5%'
  },
  width100: {
    width: '100%'
  }
}

const PosedSlideContainer = posed.div({
  withSideBar: {
    width: '77vw',
    flip: true
  },
  withoutSideBar: {
    width: '100vw',
    flip: true
  }
})

class Container extends Component {
  state = {
    isVisible: false,
    notes: [],
    isLoading: true,
  }
  componentDidMount = () => {
    //fetch all notes
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 3000)
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.showSideBar !== this.props.showSideBar) {
      this.setState({ isVisible: nextProps.showSideBar })
    }
  }
  render() {
    const { isVisible } = this.state
    const { classes, isSelectingNote, isCreatingNote, selectedNoteId, handleCloseSideBar } = this.props;
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: supernote,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    return (
      <PosedSlideContainer
        pose={isVisible ? 'withSideBar' : 'withoutSideBar'}
        onClick={handleCloseSideBar}
      >
        <div className={classes.root}>
          {this.state.isLoading ?
            <div className={classes.lottieRoot}>
              <div className={classes.marginBottom}>It's a bird. It's a plane. Wait, it's <strong>Supernote</strong>!</div>
              <Lottie options={defaultOptions}
                height={400}
                width={400} />
            </div>
            :
            <div className={classes.width100}>
              <Route exact path='/' render={(props) => <Notes {...props} handleOpenNote={this.props.handleOpenNote} />} />
              <Route path='/notes' render={(props) => <Notes {...props} handleOpenNote={this.props.handleOpenNote} />} />
              <Route path='/sort' render={(props) => <Notes {...props} handleOpenNote={this.props.handleOpenNote} />} />
              <Route path='/export' render={(props) => <ExportNotes {...props} />} />
              {/* <Route path='/tags' render={(props) => <div {...props}></div>} />
            <Route path='/lists' render={(props) => <div {...props}></div>} />
            <Route path='/account' render={(props) => <div {...props}></div>} />
            <Route path='/settings' render={(props) => <div {...props}></div>} /> */}
            </div>
          }
          {isSelectingNote ?
            <SelectedNote id={selectedNoteId} handleCloseNote={this.props.handleCloseNote} />
            :
            ''
          }
          {isCreatingNote ?
            <NewNote id={selectedNoteId} handleSaveNote={this.props.handleSaveNote} />
            :
            ''
          }

        </div>
      </PosedSlideContainer>
    );
  }
}

export default injectSheet(styles)(Container);
