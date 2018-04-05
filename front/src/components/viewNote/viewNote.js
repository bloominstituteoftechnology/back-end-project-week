import React, { Component } from "react";

const ViewNote = (props) => {
    return(
        <div className="viewNote">
            <div className="viewNote__options">
                <p className="viewNote__options__text">edit</p>
                <p className="viewNote__options__text">delete</p>
            </div>

            <div className="viewNote__header">
                <p className="viewNote__header__text">{props.location.state.title}</p>
            </div>

            <div className="viewNote__content">
                <p className="viewNote__content__text">{props.location.state.content}</p>
            </div>

            <div className="deleteNote">
                <div className="deleteNote__modal">
                    <p className="deleteNote__modal__header">Are you sure you want to delete this?</p>
                    <div className="deleteNote__modal__buttons">
                    <div className="deleteNote__modal__delete">
                        <a className="deleteNote__modal__link" href="/"><p className="deleteNote__modal__delete__text">Delete</p></a>
                    </div>
                    <div className="deleteNote__modal__no">
                        <a className="deleteNote__modal__link" href="/note"><p className="deleteNote__modal__no__text">No</p></a>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewNote;