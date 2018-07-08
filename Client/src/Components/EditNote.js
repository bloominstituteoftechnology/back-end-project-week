import React, { Component } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const port = "5000"

class EditNote extends Component {
    constructor(props) {
        super(props);
        this.state ={}
    }

    componentWillMount(){ //WORKS
        this.setState(this.props.location.state)
    }
    handleChange = (e) => { //works
        this.setState({[e.target.name]: e.target.value})
    }

    handleClick = () => { //works
        axios.put(`http://localhost:${port}/api/notes/${this.state.id}`, this.state)
            .then(response => {
                this.props.history.push("/notes");
            })
    }
    
    render() {
        console.log(this.state);
        return (
            <div className="create-note-app-page">
                <Sidebar />
                <div className="main-form-container">
                    <div className="create-note-wrapper">
                        <h3>Edit Note</h3>
                        <div className="new-note-wrapper">
                            <label className="label">Note Title:</label>
                            <input 
                                className= "input-title" 
                                placeholder="note title" 
                                onChange={this.handleChange} 
                                name="title" 
                                type="text-area"
                                value={this.state.title}/>
                        </div>
                        <div className="new-note-wrapper">
                            <label className="label">Note Body:</label>
                            <textarea 
                                className="input-body" 
                                placeholder="note content" 
                                onChange={this.handleChange} 
                                name="body" 
                                type="text-area" 
                                value={this.state.body}/>
                        </div>
                        <div className="new-note-wrapper">
                            <label className="label">Author:</label>
                            <input 
                                className= "input-title" 
                                placeholder="note author" 
                                onChange={this.handleChange} 
                                name="author" 
                                type="text-area"
                                value={this.state.author}/>
                        </div>
                        <div className="button login-button" onClick={this.handleClick}>Save</div>
                    </div>
                </div>
            </div>
            );
    }
}

export default EditNote;