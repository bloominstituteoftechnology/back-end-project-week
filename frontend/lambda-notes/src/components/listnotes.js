import React, { Component } from 'react';

import NotePreview from './note-preview.js';
import './css/listnotes.css'
import { NOTE_ADDED } from '../actions/index.js';



export default class AllNotes extends Component {
  constructor(props){
    super(props);
    console.log('this.props.notes',this.props.notes.notes)
    this.state = {
      stateNotes: false,
      notes: [],
    }
  }



  render() {
    // console.log(this.props)
     console.log('this.props.notes', this.props.notes.notes)

    if (!this.props.notes.notes) {
      return (
        <div>Hang on a sec'</div>
      );
    }
    else {
      return (
        <div className="allnotes">
          <h3>Your Notes:</h3>
         
           
  
          <div className="all-notes">
            {this.props.notes.notes.map((note, index) => {
             console.log(NOTE_ADDED)
              return (
                <NotePreview
                  onDrop={this.props.onDrop}
                  key={index}
                  // index={index}
                  id={index}
                  note={note}
                />)
            })}
          </div>
        </div>
      );
    }

  }
}