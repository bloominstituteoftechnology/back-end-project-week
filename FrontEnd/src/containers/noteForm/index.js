import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/index';

class NoteForm extends Component {

    constructor() {
        super();
    };

    add_Note() {
        this.props.dispatch(actions.add_Note(Object.assign({}, this.props.noteForm, this.props.user)));
    };

    edit_Note() {
        this.props.dispatch(actions.edit_Note(this.props.noteForm));
    };

    render() {
        return (
            <li className="notemate-add-note">
                <input className="notemate-add-note-title" type="text" placeholder="Title" onChange={this.edit_note.bind(this, 'title')} value={this.props.noteForm.title} />
                <textarea className="notemate-add-note-body" placeholder="Body" onChange={this.edit_note.bind(this, 'body')} value={this.props.noteForm.body} />
                <button onClick={this.props.noteForm.updating &&
                    this.update_note.bind(this) ||
                    this.add_note.bind(this)}>
                    {`${this.props.noteForm.updating ? 'Update' : 'Add'} note`}
                </button>
            </li>
        );
    };
};

mapStateToProps = store => {
    return {
        noteForm: store.noteForm,
        userInfo: {
            email: store.user && store.user.email,
        }
    };
};

noteForm.propTypes = {
    noteForm: PropTypes.shape({
        title: PropTypes.string,
        body: PropTypes.string,
        updating: PropTypes.bool,
        edit_Index: PropTypes.number,
        edit_Id: PropTypes.string
    }),
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(NoteForm);
