import React, { Component } from 'react';
//import Note from './Note';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class NotesList extends Component {
    render() {
        return (
            <React.Fragment>
                <h2 className="page-title">Your Notes:</h2>
                <div className="page-content">
                    <div className="notes-list">
                        {this.props.notes.map((mappedNote, index) => {
                            return(

                                <Link to={`/notes/${mappedNote.id}`} key={index} className="note">
                                    <h3 className="note-title">
                                        {mappedNote.title}
                                    </h3>
                                    <p className="note-body">
                                        {mappedNote.content}
                                    </p>
                                </Link>

                            );
                        })}
                    </div>
                </div>
            </React.Fragment>
        );
    };
};

const mapStateToProps = state => {
    return{
        notes: state.notes
    }
}

export default connect(mapStateToProps)(NotesList);