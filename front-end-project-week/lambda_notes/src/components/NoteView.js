import React, { Component } from 'react';
import DeleteNote from './DeleteNote';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css'

export default class NoteView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDelete: false,
            // selectedNote: [],
            dummyNotes: []
        }
    }

    // Using componentDidMount will guarantee that there's a component to update.
    // Can add event listeners

    showModal = () => {
        this.setState({displayDelete: !this.state.displayDelete})
    }

    componentDidMount() {
        axios
            .get(`http://localhost:3300/api/notes/${this.props.match.params.id}`)
            .then( res => {
                console.log(res.data[0])
                this.setState({ dummyNotes: res.data[0] })
            })
            .catch(err => {
                console.log('Error:', err);
            })
    }

    // componentWillReceiveProps() {
        
    //     let noteId = this.props.match.params.id;
    //     console.log('props.match:', this.props.match)
    //     console.log('noteId:', noteId);
        
    //     let selectedNote = this.state.dummyNotes.filter((note) => note.id.toString() === noteId);
    //     console.log('selectedNote:', selectedNote);
        
    //     this.setState({selectedNote: selectedNote});
    //     console.log('dummyNotes CWRP:', this.state.dummyNotes)
    //     console.log('dummyNotes CWRP at index 0:', this.state.dummyNotes[0])
    //     console.log('selectedNote:', selectedNote)
    //     console.log('selectedNote Title:', selectedNote[0].title)
    //     console.log('selectedNote Body:', selectedNote[0].body)
    // }

    // componentDidUpdate() {
    //     axios
    //         .get(url)
    //         .then()
    //         .catch(err => console.log('Error:', err))
    // }

    render() {
        return (
            <div className='createNoteContainer'>
                <div className='noteViewLinks'>
                    <Link 
                        to={`/edit/${this.props.match.params.id}`} 
                        className='noteViewEdit noteViewLink'
                    >
                        <strong>edit </strong>
                    </Link>
                    <a 
                        href='#' 
                        onClick={this.showModal} 
                        className='noteViewLink'
                    >
                        <strong>delete</strong>
                    </a>
                </div>
                <h3>{this.state.dummyNotes.title}</h3>
                <p>{this.state.dummyNotes.body}</p>
                <DeleteNote toggle={this.state.displayDelete} updateStatus={this.showModal} />
            </div>
        )
    }
}