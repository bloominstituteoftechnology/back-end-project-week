import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { notes } from '../notes';

import '../pagestyles/card.css';

class NewNote extends Component{
    constructor(props){
        super();
        this.state = {
            id: notes.length,
            title: '',
            text: ''
        };
    };

    handleChange = (event) => {
        this.setState({
        [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let id = this.state.id;
        notes.push(this.state);
            this.setState({
            id: ++id,
            title: event.target.value,
            text: event.target.value
        });
    };

    render(){
        return(
        <div className='page-container'>
            <div className='page-title'>New Note:</div>
            <form className='card-form'>
                <input name='title' className='form-input form-input-title' type='text' placeholder='-Note Title Here-' value={this.state.title} onChange={(event) => this.handleChange(event)} />
                <br></br>
                <input name='text' className='form-input form-input-text' type='text' placeholder='-Note Here-' value={this.state.text} onChange={(event) => this.handleChange(event)} />
                <br></br>
                <button className='form-button' onClick={(event) => this.handleSubmit(event)}><Link to='/'>Submit</Link></button>
            </form>
        </div>
        );
    };
};

export default NewNote;