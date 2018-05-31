import React, { Component } from 'react';
import db from './dummyData.js';
import { withStyles } from '@material-ui/core/styles';

import Wheel from './Navigation/Wheel';
import NoteContainer from './Note/NoteContainer';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
})

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NoteContainer />
        <Wheel />
      </div>
    );
  }
}

export default withStyles(styles)(App);
