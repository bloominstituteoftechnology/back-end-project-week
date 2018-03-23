import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Notes from '../../components/notes/notes';

import * as actions from '../../actions/index';

class NoteList extends React.Component {

    constructor() {
        super();
    };

    edit_note(note, index) {
        this.props.dispatch(actions.edit_note({
            updating: true,
            title: note.title,
            body: note.body,
            edit_Index: index,
            edit_Id: note.id
        }));
    };

    delete_note(id) {
        this.props.dispatch(actions.delete_note(id));
    };

    render() {
        console.log(this.props.notes);
        return (
            <ul className="notemate-note-list">

                {/* {
                    this.props.notes.map((note, index) =>
                        <NoteList note={note}
                            index={index}
                            key={note.id}
                            delete={this.delete_note.bind(this)}
                            edit={this.edit_note.bind(this)}
                            email={this.props.email} />)
                } */}
            </ul>
        );
    };
};

const mapStateToProps = store => {
    return {
        notes: store,
        email: store.user && store.user.email
    };
};

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        createdDate: PropTypes.string.isRequired,
        email: PropTypes.string,
    })).isRequired,
    email: PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(NoteList);
