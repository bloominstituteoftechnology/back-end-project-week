import React, { Component } from 'react';
import Note from './Note';
import { connect } from 'react-redux';


class NotesList extends Component {
    render() {
        return (
            <div className="notes-list">
                <h2 className="page-title">Your Notes:</h2>
                <div className="page-content">
                    {this.props.notes.map((mappedNote, index) => {
                        return(

                            <Note 
                                mappedNote={mappedNote}
                                key={index}
                            />

                        );
                    })}
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return{
        notes: state.notes
    }
}

export default connect(mapStateToProps)(NotesList);