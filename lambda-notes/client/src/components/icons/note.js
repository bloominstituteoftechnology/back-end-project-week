import React from 'react';
import { Link } from 'react-router-dom';

const Note = () => {
    return (
        <Link className='link__second' to='/view'><div className="note__icon__title">
            <p className="note__icon__content">Test for title</p>
            <hr />
            <p>Test for snippet of note</p>
        </div></Link>
    );
};

export default Note;