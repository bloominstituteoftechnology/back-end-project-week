import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import injectSheet from 'react-jss';

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
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    padding: '0 5%',
  },
  marginBottom: {
    marginBottom: '5%'
  },
  width100: {
    width: '100%'
  }
}

class Container extends Component {
  state = {
    notes: [],
    isLoading: true,
  }
  componentDidMount = () => {
    //fetch all notes
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 1000)
  }
  render() {
    const { classes, isSelectingNote, isCreatingNote, selectedNoteId } = this.props;
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: supernote,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    return (
      <div className={classes.root}>
        {this.state.isLoading ?
          <div>
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
    );
  }
}

export default injectSheet(styles)(Container);
