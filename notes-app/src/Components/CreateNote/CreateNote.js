import React, { Component } from 'react';
import axios from 'axios';
import './index.css';


class CreateNote extends Component {
    
    state = {
        title: '',
        content: '',
    }
    

    render() {
        return (
            <div className='create_view'>
                <form className="create_form" onSubmit={this.create}>
                    <h3 className="create_header">Create New Note: </h3>
                    <br />
                    <input 
                        className="create_title" 
                        type="text" 
                        placeholder="Note Title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        name="title"
                    />
                    <br /><br />
                    <textarea 
                        className="create_content" 
                        rows="20" 
                        placeholder="Note Content"
                        value={this.state.content}
                        onChange={this.handleChange}
                        name="content"
                    />
                        <br />
                    <button 
                    className="create_button"
                    onClick={this.handleUpdate}>Save</button>
                </form>
                <br /><br />
            </div>
        )
    }

    handleChange = (event) => {

        console.log(event.target.name)
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }


    create = event => { 
        event.preventDefault();
        console.log("Create History", this.props.history)
        
        axios
            .post('http://localhost:5000/notes', this.state)
            .then(res => {
                console.log(res.data);
                this.props.history.push('/notes');
                window.location.reload();
            })
            .catch(err => {
                console.log(err, 'err')
        });

    };

}

export default CreateNote;
