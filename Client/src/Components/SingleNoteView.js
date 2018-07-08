import React, { Component } from 'react';
import Sidebar from './Sidebar';
import IndivNote from './IndivNote';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

class SingleNoteView extends Component {
    constructor(props) {
        super(props);
        this.state ={
            note: this.props.location.state,
            modal: false
        }

        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.setState({modal: !this.state.modal})
    }
    

    render() {
        console.log(this.state)
        return (
            <div className="indiv-note-single">
                <Sidebar />
                <div className="indiv-note-container">
                <div className="single-note-nav-bar">
                    <div className="nav">
                        <Link to=
                            {{pathname:`/notes/edit/${this.state.note.id}`, 
                            state: {note_title: this.state.note.note_title, note_body: this.state.note.note_body, id: this.state.note.id
                            }}}
                              
                              >
                            Edit
                        </Link>
                    </div> {/*line 29*/}
                    <div className="nav" onClick={this.toggle}>Delete</div>
                    {/* //Modal content here} */}
                    <div className="modal-overlay" onClick={this.toggle}>
                    <Modal isOpen={this.state.modal} className="delete-modal hidden" onClick={this.toggle}>
                            <ModalHeader onClick={this.toggle}>Are you sure?</ModalHeader>
                            <ModalBody>
                            <p>Are you sure you want to delete this note?</p>
                            <div className="modal-buttons">
                                <Button className="edit-view-button red" onClick={this.toggle}>Delete</Button>
                                <Button className="edit-view-button teal" onClick={this.toggle}>Cancel</Button>
                            </div>
                            </ModalBody>
                    </Modal>
                    </div>
                </div> {/*end single note nav bar */}
                <IndivNote 
                    note_title={this.state.note.note_title}
                    note_body={this.state.note.note_body}
                />
                </div>
            </div>
        );
    }
}

export default SingleNoteView;
