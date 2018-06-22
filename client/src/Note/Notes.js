import React, { Component } from 'react';
import db from '../dummyData.js';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';

import Note from './Note';
import Group from './Group';

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
    notes0: [],
    notes1: [],
    notes2: [],
    notes3: []
  }
  componentDidMount = () => {
    let resNotes = db.data.notes //to-do: get original notes from db
    if (this.props.match.path === '/sort') {
      resNotes = resNotes.sort((prev, next) => prev.title - next.title)
      // placing each note to col
      let col = 0, row = 0;
      for (let i = 0; i < resNotes.length; i++) {
        if (col === 4) {
          col = 0
          row++
        }
        resNotes[i].col = col
        resNotes[i].row = row
        col++
      }
    }
    this.setState({
      notes0: resNotes.filter(note => note.col === 0),
      notes1: resNotes.filter(note => note.col === 1),
      notes2: resNotes.filter(note => note.col === 2),
      notes3: resNotes.filter(note => note.col === 3)
    })
  }
  handleNoteDrop = (group, notes, e) => {
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

    this.setState({ [`notes${group}`]: updatedNotes });
  }
  render() {
    const { notes0, notes1, notes2, notes3 } = this.state
    const { classes, handleOpenNote } = this.props
    return (
      <div className={classes.notes}>
        <Group notes={notes1} group={1} handleNoteDrop={this.handleNoteDrop} handleOpenNote={handleOpenNote} />
        <Group notes={notes0} group={0} handleNoteDrop={this.handleNoteDrop} handleOpenNote={handleOpenNote} />
        <Group notes={notes2} group={2} handleNoteDrop={this.handleNoteDrop} handleOpenNote={handleOpenNote} />
        <Group notes={notes3} group={3} handleNoteDrop={this.handleNoteDrop} handleOpenNote={handleOpenNote} />

      </div>
    );
  }
}

export default injectSheet(styles)(Notes);
