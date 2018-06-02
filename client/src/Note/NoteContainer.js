import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import injectSheet from 'react-jss';

import Notes from './Notes';

const styles = {
  root: {
    flexGrow: 1
  },
}

class NoteContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Route exact path='/' render={(props) => <Notes {...props} />} />
      </div>
    );
  }
}

export default injectSheet(styles)(NoteContainer);
