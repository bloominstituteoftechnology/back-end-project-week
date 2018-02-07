import React, { Component } from 'react';
import {connect} from 'react-redux';

class Notes extends Component {
    render() {
        return (
            <div className='Notes'>
                {this.props.notes.map((note, index) => {
                return <div className='note' onClick={() => {this.props.previewNote(note.Title, note.Text, note.ID)}} key={note.ID}>
                    <div>{note.Title}</div>
                    <div>{note.Text}</div>
                </div>
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes
    }
}

export default connect(mapStateToProps) (Notes);