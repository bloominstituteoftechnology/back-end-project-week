import React from 'react';
import styles from '../CreateNote/CreateNote.css';
import {NavLink} from 'react-router-dom';

class CreateNote extends React.Component{
  constructor(){
      super()
      this.state = {
        title: '',
        content: ''
    }

  }
    // componentDidMount(){
    //     this.setState({
    //         title: this.props.notes.title,
    //         content: this.props.notes.content
    //     })
    // }

    inputHandler = event =>{
        
        this.setState({[event.target.name] : event.target.value})
    }

    submitHandler = event =>{
        event.preventDefault();
        console.log(this.state);
        this.props.createNote(this.state);
        
        this.setState({
            title: '',
            content: ''
        })
        this.props.history.push('/');
    }

    render(){
        return(
            <div className = 'create-note-container'>
                <div className = 'create-sub-container'>
                    <h1 className = 'create-header'>Create Note</h1>
                    <form  className = 'form'>
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
                            <div type = 'submit' onClick = {this.submitHandler} className = 'submit-button'>
                                <div className = 'button-text'>SUBMIT</div>
                            </div>    
                        </NavLink>    
                    </form>

                    
                </div>
            </div>
        )
    }
}

export default CreateNote;