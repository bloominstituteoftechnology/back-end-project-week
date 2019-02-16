import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from '../EditNote/EditNote.css';
import axios from 'axios';


class EditNote extends React.Component{
    state = {
        
        title: '',
        content: ''
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.fetchNote(id);
    }
    fetchNote = id => {
        axios
        .get(`http://localhost:3100/notes/${id}`)
        .then(response => {
            
            this.setState(() => ({ 
                note: response.data[0]
             }))
        })
        .catch(err => {
            console.error('Trouble fetching data',err)
        })
    }
    inputHandler = event =>{
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler = event =>{
        event.preventDefault();
        this.props.updateNote({
            
            title: this.state.title,
            content: this.state.content
        });
        this.setState({

        })
    }
   


    render(){

        return(
            <div className = 'edit-note-container'>
                <div className = 'edit-sub-container'>
                    <h1 className = 'edit-header'>Edit Note</h1>
                    <form onSubmit = {this.submitHandler} className = 'form'>
                        <input 
                            className = 'title-input'
                            type = 'text'
                            placeholder = ' Enter New Title'
                            name = 'title'
                            value = {this.state.title}
                            onChange = {this.inputHandler}

                        />
                        <input 
                            className = 'content-input'
                            type = 'text'
                            placeholder = '   Enter New Content'
                            name = 'content'
                            value = {this.state.content}
                            onChange = {this.inputHandler}
                        />
                        <NavLink  className = 'nav-link' exact to = '/' >
                            <div className = 'submit-button'>
                                <div className = 'button-text'>
                                    SUBMIT
                                </div>
                            </div>    
                        </NavLink>    
                    </form>
                </div>
            </div>
        )
    }
}

export default EditNote;