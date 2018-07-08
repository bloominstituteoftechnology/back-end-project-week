import React, { Component } from 'react';
import Sidebar from './Sidebar';
import IndivNote from './IndivNote';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SingleNoteView extends Component {
    constructor(props) {
        super(props);
        this.state ={
            note: this.props.location.state,
            id: this.props.location.state.id,
            modal: false
        }

        this.toggle = this.toggle.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    



    toggle() {
        this.setState({modal: !this.state.modal})
    }

    onDelete() {
        console.log(this.state.id);

    axios.delete(`http://localhost:5000/api/notes/${this.state.id}`)
        .then(res => {
            console.log(res.data);
            this.props.history.push("/notes");
        })
    };



    

    render() {
         console.log(this.state);
         return (
             <div className="indiv-note-single">
                <div className={this.state.modal? "overlay": "hidden"} onClick={this.toggle} />
                <Sidebar />
                <div className="indiv-note-container">
                    <div className="single-note-nav-bar">
                        <div className="nav">
                            <Link className="edit-button"to=
                                {{pathname:`/notes/edit/${this.state.note.id}`, 
                                state: {title: this.state.note.title, body: this.state.note.body, author: this.state.note.author, id: this.state.note.id
                                }}}
                                
                                >
                                Edit
                            </Link>
                        </div>
                            <div 
                                className="nav" 
                                onClick={this.toggle}>Delete
                            </div>
                    </div>
                    <div
                        className={this.state.modal? "modal-content": "hidden"} 
                        onClick={this.toggle}>
                        <h4 className="modal-header">Are you sure you want to delete this note?</h4>
                        <div className="modal-footer">
                            <button className="modal-buttons red" onClick={this.onDelete}>Delete</button>
                            <button className="modal-buttons teal">No</button>
                        </div>
                    </div>
                  
                   <IndivNote 
                        title={this.state.note.title}
                        body={this.state.note.body}
                        author={this.state.note.author}
                    />
                </div>
            </div>
         );
       }
     }

export default SingleNoteView;
