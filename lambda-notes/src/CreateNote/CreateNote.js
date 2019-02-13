import React from 'react';
import styles from '../CreateNote/CreateNote.css';
import {NavLink} from 'react-router-dom';

class CreateNote extends React.Component{
    state = {

    }
    render(){
        return(
            <div className = 'create-note-container'>
                <div className = 'create-sub-container'>
                    <h1 className = 'create-header'>Create Note</h1>
                    <form className = 'form'>
                        <input 
                            className = 'title-input'
                            type = 'text'
                            placeholder = ' Enter New Title'

                        />
                        <input 
                            className = 'content-input'
                            type = 'text'
                            placeholder = '   Enter New Content'
                        />
                        <NavLink  className = 'nav-link' exact to = '/' >
                            <div className = 'submit-button'>
                                <div className = 'button-text'>
                                    SUBMIT NOTE
                                </div>
                            </div>    
                        </NavLink>    
                    </form>

                    
                </div>
            </div>
        )
    }
}

export default CreateNote;