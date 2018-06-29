import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import './EditNote.css';

class EditNote extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            text: '',
            redirect: false
        }
    }

    componentWillMount() {
        const token = localStorage.getItem('jwt');
        const requestOptions = {
            headers: {
                Authorization: token
            }
        }
        axios.get(`http://localhost:1433/api/users/${localStorage.getItem('userId')}/notes/${this.props.match.params.noteId}`, requestOptions)
            .then(response => {
                this.setState({ title: response.data.title, text: response.data.text })
            })
            .catch(error => {
                console.log(`Error: ${error.response.status} ${error.response.data}`);
            })
    }

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    submitHandler = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwt');
        const requestOptions = {
            headers: {
                Authorization: token
            }
        }
        axios.put(`http://localhost:1433/api/users/${localStorage.getItem('userId')}/notes/${this.props.match.params.noteId}`, { title: this.state.title, text: this.state.text }, requestOptions)
            .then(response => {
                this.setState({ redirect: true });
            })
            .catch(error => {

            })
    }

    render() {
        return (
            <div className='editNote'>
                <h4>Edit Note: </h4>
                <form onSubmit={this.submitHandler}>
                    <input type='text' name='title' maxLength='20' value={this.state.title} onChange={this.handleOnChange} required />
                    <textarea name='text' rows='15' cols='50' maxLength='1000' value={this.state.text} onChange={this.handleOnChange} required />
                    <input type='submit' value='Update' className='submit' />
                </form>
                {this.state.redirect ? <Redirect to={`/${localStorage.getItem('userId')}/notes/${this.props.match.params.noteId}`} /> : null}
                {!localStorage.getItem('jwt') || !localStorage.getItem('userId') ? this.props.history.push('/') : null}
            </div>
        )
    }
}

export default withRouter(EditNote); 