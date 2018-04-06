import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ViewNote extends Component {
    constructor(props){
        super(props);
    }

    handleDelete = (event) => {
        axios.delete("http://localhost:3001/api/deleteNote", {data: {id: this.props.location.state.id}})
            .then(response => console.log(`The note was successfully removed`))
            .catch(err => console.log(`There was an error with the axios delete request: \n ${err}`))
    }

    render(){
        return(
            <div className="viewNote">
            <div className="viewNote__options">
                <Link to={{pathname: "/editnote", state: {title: this.props.location.state.title, content: this.props.location.state.content, id: this.props.location.state.id}}}><p className="viewNote__options__text">edit</p></Link>
                <a href="/"><p className="viewNote__options__text" onClick={this.handleDelete}>delete</p></a>
            </div>

            <div className="viewNote__header">
                <p className="viewNote__header__text">{this.props.location.state.title}</p>
            </div>

            <div className="viewNote__content">
                <p className="viewNote__content__text">{this.props.location.state.content}</p>
            </div>

            {/* <div className="deleteNote">
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
            </div> */}
        </div>
        )
    }
}

export default ViewNote;