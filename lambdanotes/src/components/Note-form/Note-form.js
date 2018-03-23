import React, { Component } from 'react';
import './Note-form.css';

class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newNoteContent: '',
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNote = this.writeNote.bind(this);
    }

    handleUserInput(write) {
        console.log(this); //I'll probably put this on everything...
        this.setState({
            newNoteContent: write.target.value,
        })
    }

    writeNote() {
        this.props.addNote(this.state.newNoteContent);
        this.setState({
            newNoteContent: '',
        })
    }

    render() {
        return (
            <div>
                <div className='form-wrapper'>
                    <input className='note-input'
                        placeholder='Title'
                        value={this.state.newNoteContent}
                        onChange={this.handleUserInput} />
                    <button className='note-button'
                        onClick={this.writeNote} > Add Note </button>
                </div>
            </div>
        )
    }
}

export default NoteForm;