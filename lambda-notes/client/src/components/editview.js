import React, { Component } from 'react';

class EditView extends Component {

    render() {
        return (
            <div>
                <div className="section__content__left">
                    <h1 className="title">Lambda Notes</h1>
                    <button className="button__main">View Your Notes</button>
                    <br />
                    <button className="button__main">+ Create New Note</button>

                </div>
                <div className="main">
                    <div className="main__list">
                        <h3 className="title__main">Edit Note:</h3>
                        <input className="note__input__title" placeholder="Note Title"></input>
                        <textarea className="note__input__content" placeholder="Note Content"></textarea>
                        <br />
                        <button className="button__main__update">Update</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditView;