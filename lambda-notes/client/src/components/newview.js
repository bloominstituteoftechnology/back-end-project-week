import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';

class NewView extends Component {

    render() {
        return (
            <div>
                <div className="section__content__left">
                <h1 className="title"><Link to='/user' className="title__link">Lambda Notes</Link></h1>
                    <button className="button__main"><Link className="link" to='/user'>View Your Notes</Link></button>
                    <br />
                   <button className="button__main"><Link className="link" to='/create'>+ Create New Note</Link></button>

                </div>
                <div className="main">
                    <div className="main__list">
                        <h3 className="title__main">Create Note:</h3>
                        <input className="note__input__title" placeholder="Note Title"></input>
                        <textarea className="note__input__content" placeholder="Note Content"></textarea>
                        <br />
                        <button className="button__main__update">Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewView;