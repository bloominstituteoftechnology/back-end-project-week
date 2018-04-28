import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../actions/index';

class NoteForm extends Component {

    constructor() {
        super();
    };

    add_note() {
        this.props.dispatch(actions.add_note(Object.assign({}, this.props.noteForm, this.props.user)));
    };

    edit_note() {
        this.props.dispatch(actions.edit_note(this.props.noteForm));
    };

    render() {
        return (
            <li className="notemate-add-note">
                <input className="notemate-add-note-title" type="text" placeholder="Title" onChange={this.edit_note.bind(this)} value={this.props.title} />
                <textarea className="notemate-add-note-body" placeholder="Body" onChange={this.edit_note.bind(this)} value={this.props.body} />
                <button onClick={this.props.updating &&
                    this.update_note.bind(this) ||
                    this.add_note.bind(this)}>
                    {`${this.props.updating ? 'Update' : 'Add'} note`}
                </button>
            </li>
        );
    };
};

const mapStateToProps = store => {
    return {
        noteForm: store.noteForm,
        userInfo: {
            email: store.user && store.user.email,
        }
    };
};

NoteForm.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    updating: PropTypes.bool,
    edit_index: PropTypes.number,
    edit_id: PropTypes.string
};
dispatch: PropTypes.func.isRequired

export default connect(mapStateToProps)(NoteForm);
