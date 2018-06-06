import React, { Component } from 'react';
import db from '../dummyData.js';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';

import Note from './Note';

const styles = theme => ({
  notes: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    flexGrow: 1,
    alignItems: 'flex-start'
  }
})

class Notes extends Component {
  state = {
    notes: []
  }
  componentDidMount = () => {
    this.setState({ notes: db.data.notes })
  }
  render() {
    const { notes } = this.state
    const { classes } = this.props
    return (
      <div className={classes.notes}>
        {notes.map((note, index) =>
          <Note key={index} {...note} />
        )}
      </div>
    );
  }
}

export default injectSheet(styles)(Notes);
