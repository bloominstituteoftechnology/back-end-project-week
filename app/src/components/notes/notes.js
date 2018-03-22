import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNotes } from '../../actions';

import Note from './note';
import NoteStatusBar from './noteStatusBar';

class Notes extends Component {
    state = {
        notes: [],
    };

    componentDidMount() {
        this.props.getNotes();

        if (this.props.error) {
            window.alert(this.props.error);
            this.props.history.push('/login');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            window.alert(nextProps.error);
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div className="Notes">
                {this.props.notes.map(note => {
                    return (
                        <div className="NoteContainer" key={note._id}>
                            <NoteStatusBar id={note._id} />

                            <Note note={note} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
        error: state.auth.error,
    };
};

export default connect(mapStateToProps, { getNotes })(Notes);