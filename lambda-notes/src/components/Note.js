import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { fetchNotes } from '../actions';
import axios from 'axios';
const config = require("../_config");

class Note extends Component {
    constructor(props) {
        super(props)
            this.state = {
            notes: [],
            modalActive: false
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle(e) {
        e.preventDefault();
        this.setState({ modalActive: !this.state.modalActive })
    }

    matchedNote = this.props.notes.filter(note => {
        // console.log("note: ", note);
        return note._id == this.props.match.params.id
    })[0];

    handleRemoveNote = (event, _id) => {
        event.preventDefault();
        axios.delete(`${config.devBackend}/notes/${_id}`)
            .then(() => {
                this.props.fetchNotes();
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err);
            })
    };

    render() {
        console.log("this.props.notes: ", this.props.notes)
        // console.log(this.matchedNote)
        return (
            <div className="note-view">
                <div className="button-group">
                    <Link to={`/editNote/${this.matchedNote._id}`} className="edit-button">
                        <button>Edit</button>
                    </Link>
                    <button
                        className="remove-button"
                        onClick={this.toggle}
                        >Remove Note
                    </button>
                </div>
                <div className="full-note">
                    <h4 className="note-title">{this.matchedNote.title}</h4>
                    <p className="note-body">{this.matchedNote.content}</p>
                </div>
                <Modal isOpen={this.state.modalActive} toggle={this.toggle} className="modal-style">
                    <ModalBody className="modal-body">
                        Are you sure you want to delete this?
                    </ModalBody>
                    <ModalFooter className="button-wrapper">
                        <button style={{ backgroundColor: "#D1001A"}} className="modal-button1 modal-button" onClick={event => {
                            this.handleRemoveNote(event, this.matchedNote._id);
                        }}>
                            Delete
                        </button> 
                        <button style={{ backgroundColor: "#00B9BD"}} className="modal-button2 modal-button" onClick={this.toggle}>
                            No
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        notes: store[0].notes
    };
};

export default connect(mapStateToProps, { fetchNotes })(Note);