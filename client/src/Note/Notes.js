import React, { Component } from 'react';
import db from '../dummyData.js';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import { applyDrag } from '../Helper/applyDrag';

import Note from './Note';
import Group from './Group';

const notes = db.data.notes

const styles = theme => ({
  notes: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    flexGrow: 1,
    '&>div': {
      width: '25%'
    }
  }
})

class Notes extends Component {
  state = {
    notes0: notes.filter(note => note.col === 0),
    notes1: notes.filter(note => note.col === 1),
    notes2: notes.filter(note => note.col === 2),
    notes3: notes.filter(note => note.col === 3)
  }
  componentDidMount = () => {
  }
  handleDrop = (group, notes, e) => {
    const { addedIndex, removedIndex, payload } = e

    if (removedIndex === null && addedIndex === null) return;

    const updatedNotes = [...notes];
    let itemToAdd = payload;

    if (removedIndex !== null) {
      // remove the note out of source group
      itemToAdd = updatedNotes.splice(removedIndex, 1)[0];

      // update row of other notes in source group
      for (let i = 0; i < updatedNotes.length; i++) {
        if (updatedNotes[i].row > itemToAdd.row) {
          updatedNotes[i].row--
        }
      }
    }

    if (addedIndex !== null) {
      // update row of other notes in destination group
      for (let i = 0; i < updatedNotes.length; i++) {
        if (updatedNotes[i].row >= addedIndex) {
          updatedNotes[i].row++
        }
      }

      // update row of the moving note in destination group
      itemToAdd.col = group
      itemToAdd.row = addedIndex

      updatedNotes.splice(addedIndex, 0, itemToAdd);

    }

    console.log(updatedNotes)
    this.setState({ [`notes${group}`]: updatedNotes });



    // console.log(updatedNotes)
    // this.setState({ notes: updatedNotes })
  }
  render() {
    const { notes0, notes1, notes2, notes3 } = this.state
    const { classes } = this.props
    return (
      <div className={classes.notes}>
        <Group notes={notes0} group={0} handleDrop={this.handleDrop} />
        <Group notes={notes1} group={1} handleDrop={this.handleDrop} />
        <Group notes={notes2} group={2} handleDrop={this.handleDrop} />
        <Group notes={notes3} group={3} handleDrop={this.handleDrop} />

      </div>
    );
  }
}

export default injectSheet(styles)(Notes);
