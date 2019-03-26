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
            dummyNotes: []
        }
    }

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

    delete = e => {
        console.log('params.id:', this.props.match.params.id)
        axios
            .delete(`http://localhost:3300/api/notes/${this.props.match.params.id}`)
            .then(res => console.log('res.data:', res.data))
            .catch(err => {
                console.log('Error:', err);
            })
        window.location.reload();
        this.props.history.push('/');
    }

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
                        onClick={this.showModal} 
                        className='noteViewLink'
                    >
                        <strong>delete</strong>
                    </a>
                </div>
                <h3>{this.state.dummyNotes.title}</h3>
                <p>{this.state.dummyNotes.body}</p>
                <DeleteNote toggle={this.state.displayDelete} updateStatus={this.showModal} delete={this.delete}  />
            </div>
        )
    }
}