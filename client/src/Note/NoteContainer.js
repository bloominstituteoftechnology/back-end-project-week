import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Notes from './Notes';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
})

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

export default withStyles(styles)(NoteContainer);
