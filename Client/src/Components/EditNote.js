import React, { Component } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

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
        axios.put(`http://localhost:25851/api/notes/${this.state.id}`, this.state)
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
                            name="note_title" 
                            type="text-area"
                            value={this.state.note_title}/>
                        </div>
                        <div className="new-note-wrapper">
                        <label className="label">Note Body:</label>
                        <textarea 
                            className="input-body" 
                            placeholder="note content" 
                            onChange={this.handleChange} 
                            name="note_body" 
                            type="text-area" 
                            value={this.state.note_body}/>
                        </div>
                        <div className="button login-button" onClick={this.handleClick}>Save</div>
                    </div>
                </div>
            </div>
            );
    }
}

export default EditNote;