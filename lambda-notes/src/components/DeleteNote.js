import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import './DeleteNote.css';
import axios from 'axios';

export default class DeleteNote extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            modal: false
         }

         this.toggle = this.toggle.bind(this);
    }

    componentWillUnmount() {
        window.location.reload();
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });

        axios
            .delete(`http://localhost:5000/api/notes/${this.props.match.params.id}`)
            .then(note => {
                console.log(note, "Was successfully deleted")
            })
            .catch(err => {
                console.error(err);
            })
    }

    render() { 
        console.log("DELETE PROPS", this.props)
        console.log("DELETE STATE", this.state)
        return ( 
            <div>
                <Button className="delete-link" 
                    style={{
                        backgroundColor: 'transparent', 
                        border: 'none', 
                        color:  '#2BC1C4', 
                        padding: '5px',
                        margin: '5px',
                        textAlign: 'center' 
                    }} 
                    onClick={this.toggle}>
                    Delete
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                <ModalHeader toggle={this.toggle}>Are you sure you want to delete this?</ModalHeader>
                <ModalFooter>
                <Link to="/" >
                    <Button  
                        style={{
                            backgroundColor: '#e60000'
                        }} 
                        onClick={this.toggle}
                    >
                        Delete Note
                    </Button>
                </Link>
                    <Button style={{backgroundColor: 'aqua'}}  onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
         )
    }
}
