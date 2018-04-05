import React, { Component } from 'react';
import Note from './icons/note';
import axios from 'axios';
import { Link } from 'react-router-dom';

class NoteList extends Component {

    render() {
        return (
            <Link className='link__second' to='/view'><div className="note__icon">
                <p className="note__icon__title">{this.props.title}</p>
                <hr className="style__one" />
                <p>{this.props.content}</p>
            </div></Link>
        );
    }


};

export default NoteList;