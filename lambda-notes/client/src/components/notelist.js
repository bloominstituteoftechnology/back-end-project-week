import React from 'react';
import Note from './icons/note';
import { Link } from 'react-router-dom';

class NoteList extends Component {
    constructor() {
        super();
        this.state = {
            content: ''
        }
    }

    contentInput(event) {
        this.setState({ content: event.target.value });
    }
    
    render() {
        return (
            <Link className='link__second' to='/view'><div className="note__icon">
            <p className="note__icon__title">Test for title</p>
            <hr className="style__one"/>
            <p>Test for snippet of note</p>
        </div></Link>
        );
    }


};

export default NoteList;