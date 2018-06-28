import React, { Component } from 'react';
import { addNote } from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './CreateNote.css';

class CreateNote extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            text: ''
        }
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        this.props.addNote({ title: this.state.title, text: this.state.text })
    }

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div className='createNote'>
                <h4>Create New Note:</h4>
                <form>
                    <input type='text' name='title' maxLength='20' placeholder='Note Title' value={this.state.title} onChange={this.handleOnChange} required />
                    <textarea name='text' rows='15' cols='50' maxLength='1000' placeholder='Note Content' value={this.state.text} onChange={this.handleOnChange} required></textarea>
                    <input type='submit' value='Save' className='submit' />
                </form>
            </div>
        )
    }
}

export default withRouter(connect(null, { addNote })(CreateNote)); 