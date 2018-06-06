import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import injectSheet from 'react-jss';

import Lottie from 'react-lottie';
import * as supernote from '../supernote.json';

import Notes from './Notes';

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
  }
}

class NoteContainer extends Component {
  state = {
    notes: [],
    isLoading: true
  }
  componentDidMount = () => {
    //fetch all notes
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 8000)
  }
  render() {
    const { classes } = this.props;
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
          <Route exact path='/' render={(props) => <Notes {...props} />} />
        }
      </div>
    );
  }
}

export default injectSheet(styles)(NoteContainer);
