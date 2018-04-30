import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { notes } from '../notes';

import '../pagestyles/page.css'
import '../pagestyles/card.css'

const SingleNote = ( props ) => {
    
        return(
        <div className='page-container'>
            <div>
                <div className='page-title'>{props.note.title}</div>
                <div className='page-text'>{props.note.text}</div>
                <Link to={`/edit/${props.note.id}`}><button className='form-button'>Edit Note</button></Link>
            </div>
        </div>
    )
}

export default SingleNote;
