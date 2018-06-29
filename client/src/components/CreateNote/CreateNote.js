import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import './CreateNote.css';

class CreateNote extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            text: '',
            notes: [],
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('jwt') || !localStorage.getItem('userId')) {
            this.props.history.push('/');
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwt');
        const requestOptions = {
            headers: {
                Authorization: token
            }
        }
        axios.post(`http://localhost:1433/api/users/${localStorage.getItem('userId')}/notes`, { title: this.state.title, text: this.state.text }, requestOptions)
            .then(response => {
                this.setState({ notes: response.data.notes });
            })
            .catch(error => {
                alert(`Error: ${error}`);
            })
    }

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div className='createNote'>
                <h4>Create New Note:</h4>
                <form onSubmit={this.submitHandler}>
                    <input type='text' name='title' maxLength='20' placeholder='Note Title' value={this.state.title} onChange={this.handleOnChange} required />
                    <textarea name='text' rows='15' cols='50' maxLength='1000' placeholder='Note Content' value={this.state.text} onChange={this.handleOnChange} required></textarea>
                    <input type='submit' value='Save' className='submit' />
                </form>
                {this.state.notes.length > 0 ? <Redirect to={`/${localStorage.getItem('userId')}/notes/${this.state.notes[this.state.notes.length - 1]._id}`} /> : null}
            </div>
        )
    }
}

export default withRouter(CreateNote); 