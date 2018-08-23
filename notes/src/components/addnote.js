import React, { Component } from 'react';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';
import '../App.css';
class Addnote extends Component {
    state={
        title: '',
        content: ''
    }

    render() {
        return (
            
            <div className="Addnote">
                <h1> Add a Note!</h1>
                <form onSubmit={this.submitHandler}>

                <div className='title'>
                    <label htmlFor='title'/>
                    <input className='addfield'
                    placeholder='Title'
                    name='title'
                    value={this.state.title}
                    onChange={this.inputChangeHandler}
                    type='text' />
                </div>

                <div className='content'>
                    <label htmlFor='content'/>
                    <textarea className='addfield2'
                    placeholder='Notes'
                    name='content'
                    value={this.state.content}
                    onChange={this.inputChangeHandler}
                    type='text' />
                </div>

                <div className='addbutton'>
                <button className='addy' type="submit">
                     Add Note
                </button>
                </div>

                </form>
                <Link className='viewer' to='/'> View All Notes</Link> 
                </div>
        )
    }

    
    inputChangeHandler = event => {
        const {name, value} = event.target 
        this.setState({[name]: value})
    };

    submitHandler = event => {
        event.preventDefault();

        axios
        .post('http://localhost:5000/addnote', this.state)
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.error('Axios failed')
        })
        console.log('state', this.state)
    }
    
}

export default Addnote