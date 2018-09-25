import React from 'react';
import './index.css'

const editNote = props => {
    return (
        <div className='createNoteContainer'>
            <h3>Edit Note:</h3>
            <form onSubmit={props.handleSubmit}>
                <input 
                    onChange={props.handleInputChange}
                    type='text' 
                    name='title'
                    className='inputTitle' 
                    placeholder='Note Title'
                >
                </input>
                <textarea 
                    rows='20'
                    value={props.body}
                    name='body'
                    onChange={props.handleInputChange}
                    className='inputContent' 
                    placeholder='Note Content'
                >
                </textarea>
                <button 
                type='submit'
                    className='createNoteButton'
                >
                    <strong>Update</strong>
                </button>
            </form>
        </div>
    )
}

export default editNote;