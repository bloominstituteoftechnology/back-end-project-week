import React, { Component } from 'react';
import {connect} from 'react-redux';

class Notes extends Component {
    render() {
        return (
            <ul className='Notes'>
                {this.props.notes.map((note, index) => {
                return <li className='note' onClick={() => {this.props.previewNote(note.Title, note.Text, note.ID)}} key={note.ID}>
                    <div className="note--title">{note.Title}</div>
                    <br/>
                    {note.Text.length > 100 ? note.Text.substring(0,100).concat('...') : note.Text}
                </li>
                })}
            </ul>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes
    }
}

export default connect(mapStateToProps) (Notes);