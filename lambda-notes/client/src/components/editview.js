import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditView extends Component {
    render() {
        return (
            <div>
                <div className="section__content__left">
                <h1 className="title"><Link to='/' className="title__link">Lambda Notes</Link></h1>
                    <button className="button__main"><Link className="link" to='/list'>View Your Notes</Link></button>
                    <br />
                   <button className="button__main"><Link className="link" to='/create'>+ Create New Note</Link></button>

                </div>
                <div className="main">
                    <div className="main__list">
                        <h3 className="title__main">Edit Note:</h3>
                        <input className="note__input__title" placeholder="Note Title"></input>
                        <textarea className="note__input__content" placeholder="Note Content"></textarea>
                        <br />
                        <button className="button__main__update"><Link className="link" to='/list'>Update</Link></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditView;