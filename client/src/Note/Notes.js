import React, { Component } from 'react';
import db from '../dummyData.js';

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    // flexGrow: 1
  },
})

class Notes extends Component {
  state = {
    notes: []
  }
  componentDidMount = () => {
    this.setState({ notes: db.data.notes })
  }
  render() {
    const { classes } = this.props;
    const { notes } = this.state;
    return (
      <div className={classes.root}>
        {notes.map(note =>
          <div>{note.title} - {note.content}</div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Notes);
