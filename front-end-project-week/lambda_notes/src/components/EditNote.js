import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.css'

class editNote extends Component {
    constructor(props) {
        super(props);
        this.state = {

            title: '',
            body: '',
        }
    }

    componentDidMount() {
        console.log(this.props.notes);
        const id = this.props.match.params.id;
        const note = this.props.notes.find(note => note.id === Number(id))
        this.setState({
            title: note.title,
            body: note.body
        })
    }

    handleInputChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:3300/api/notes/${this.props.match.params.id}`, {
                title: this.state.title,
                body: this.state.body
            })
            .then(res => {
                this.props.getNotes();
                this.props.history.push('/')
        
            })
            .catch(err => {
                console.log('Error:', err);
            })
        this.setState({
            title: '',
            body: ''
        })
    }
    
    render(){
        return (
            <div className='createNoteContainer'>
                <h3>Edit Note:</h3>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        onChange={this.handleInputChange}
                        type='text' 
                        name='title'
                        value={this.state.title}
                        className='inputTitle' 
                        placeholder='Note Title'
                    >
                    </input>
                    <textarea 
                        rows='20'
                        value={this.state.body}
                        name='body'
                        onChange={this.handleInputChange}
                        className='inputContent' 
                        placeholder='Note Content'
                    >
                    </textarea>
                    
                    <button 
                    type='submit'
                        className='createNoteButton'
                    >
                        <strong>Update</strong>
                    </button>
                   
                </form>
            </div>
        )
    }
}

export default editNote;