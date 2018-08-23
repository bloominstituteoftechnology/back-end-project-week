import React, { Component } from 'react';
import './ViewNote.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import NotePreview from '../NotePreview/NotePreview';

class ViewNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            noteIsLoaded: false,
            modalOpen: false,
            deleteNote: false
        }
        this.handleModalClick = this.handleModalClick.bind(this)
        this.deleteNote = this.deleteNote.bind(this)
    }    

    componentWillMount() {
        this.setState( 
            axios
                .get('http://localhost:8888/notes')
                .then(response => {
                    console.log("GET", response);
                    this.setState({ notes: response.data.notes, noteIsLoaded: true });
                })
                .catch(err => {
                    console.log(err);
                })
            );
    }
    
    componentDidMount() {
        // console.log("PROPS:", this.props);
        // console.log("New Things:", this.state.notes);
    }

    handleModalClick() {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    // deleteNoteClick() {
    //     this.setState({
    //         deleteNote: true,
    //         modalOpen: false
    //     })
    // }

    deleteNote = e => {
        e.preventDefault();

        const id = this.props.match.params.id;
        axios
        .delete(`${'http://localhost:8888/notes/'}${id}`)
        .then(response => {
            console.log(response);
            this.props.history.push('/');
        })
    }

    noteTitle = () => {
        return this.state.noteIsLoaded 
            ?    (<div className="displayed-note-for-reading-title">
                    {this.state.notes[this.props.match.params.id-1].title}
                </div>)
            : <div></div>
    }

    noteContent = () => {
        return this.state.noteIsLoaded
        ? (<div className="displayed-note-for-reading-content">{this.state.notes[this.props.match.params.id-1].content}</div>)
        : <div></div>
    }

    render() {
        // console.log(document.querySelector('.delete-link'));
        console.log("Hello", this.state);
        return (
            <div className="view-note">
                <div className="controls">
                    <Link className="edit-link" to={`/edit/${this.props.match.params.id}`}>edit</Link>
                    <div 
                        className="delete-link" 
                        onClick={ this.handleModalClick }
                    >delete</div>

                    <div className={ this.state.modalOpen ? "delete-modal" : "display-none" } id="delete-modal" >
                        <div className="modal-content">
                            <p className="modal-warning-message">
                                Are you sure you want to delete this?
                            </p>
                            <div className="modal-button-group">
                                <div 
                                    className="modal-button-delete"
                                    onClick={ this.deleteNote }
                                >Delete</div>
                                <div 
                                    className="modal-button-no"
                                    onClick={ this.handleModalClick }
                                >No</div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.deleteNote 
                    ? <div className="displayed-note-for-reading">Note has been deleted</div> 
                    : 
                    <div className="displayed-note-for-reading">
                        {this.noteTitle()}
                        {this.noteContent()}
                    </div>
                }
            </div>
        )
    }
}

export default ViewNote;