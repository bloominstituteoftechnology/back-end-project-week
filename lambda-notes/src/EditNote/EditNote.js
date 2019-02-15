import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from '../EditNote/EditNote.css';

class EditNote extends React.Component{
    state = {

    }
    render(){
        return(
            <div className = 'edit-note-container'>
                <div className = 'edit-sub-container'>
                    <h1 className = 'edit-header'>Edit Note</h1>
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