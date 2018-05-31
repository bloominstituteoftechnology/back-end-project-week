import React, { Component } from 'react';
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
        Something
      </div>
    );
  }
}

export default withStyles(styles)(NoteContainer);
