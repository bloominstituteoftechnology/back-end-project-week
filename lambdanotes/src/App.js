import React, { Component } from 'react';
import './App.css';
import NavButton from './components/Misc/NavButton/NavButton';
import Menu from './components/Menu/Menu';
import Note from './components/Note-main/Note-main';
import NoteForm from './components/Note-form/Note-form';


class App extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.state = { notes: [], }
  }

  addNote(note) {
    const prevNote = this.state.notes;
    prevNote.push({ id: prevNote.length + 1, noteContent: note });
    this.setState({
      notes: prevNote
    });
  }

  render() {
    return (
      <div>
        <Menu />
        <div className='note-wrapper'>
          <div className='note-header'>
          </div>
          <div className='note-body'>
            {
              this.state.notes.map((note) => {
                return (
                  <Note noteContent={note.noteContent} noteId={note.id} key={note.id} />
                )
              })
            }
          </div>
          <div className='note-footer'>
            <NoteForm addNote={this.addNote} />
          </div>
        </div>
        <NavButton className="button--aliRight" />
      </div>
    );
  }
}

export default App;
