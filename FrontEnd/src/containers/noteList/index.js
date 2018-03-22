import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Notes from '../../components/notes/notes';

import * as actions from '../../actions/index';

class NoteList extends Component {

    constructor() {
        super();
    };

    edit_Note(note, index) {
        this.props.dispatch(actions.edit_note({
            updating: true,
            title: note.title,
            body: note.body,
            edit_Index: index,
            edit_Id: note._id
        }));
    };

    delete_note(_id) {
        this.props.dispatch(actions.delete_note(_id));
    };

    render() {
        return (
            <ul className="notemate-note-list">
                {
                    this.props.notes.map((note, index) =>
                        <ListNote note={note}
                            index={index}
                            key={note._id}
                            delete={this.delete_note.bind(this)}
                            edit={this.edit_note.bind(this)}
                            email={this.props.email} />)
                }
            </ul>
        );
    };
};

mapStateToProps = store => {
    return {
        notes: store.notes,
        email: store.user && store.user.email
    };
};

noteList.propTypes = {
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
