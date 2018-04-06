import React, {Component} from "react";
import axios from "axios";

class NewNote extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: "Note Title",
            content: "Note Content"
        }
    }


    handleNewTitle = (event) => {
        this.setState({title: event.target.value})
    }

    handleNewContent = (event) => {
        this.setState({content: event.target.value});
    }

    handleSubmit = () => {
        axios.post("http://localhost:3001/api/newnote", {
            title: this.state.title,
            content: this.state.content
        })
            .then(response => {
                console.log(`Response: \n ${response} \n Response Data: \n ${response.data}`)
            })
            .catch(err => {
                console.log(`There was an error in newNote.js posing a new note document: \n ${err}`);
            })
    }

    render(){
        return(
            <div className="newNote">
                <div className="newNote__header">
                    <p>Create New Note:</p>
                </div>

                <div className="newNote__input">
                    <form className="newNote__form">
                        <input className="newNote__form__title" value={this.state.title} onChange={this.handleNewTitle} />
                        <textarea className="newNote__form__content" rows="15" columns="15" value={this.state.content} onChange={this.handleNewContent}/>
                        <a className="newNote__form__save" href="/">
                            <div className="newNote__form__button">
                                <p className="newNote__form__button__text" onClick={this.handleSubmit} style={this.styles}>Save</p>
                            </div>
                        </a>
                    </form>
                </div>
            </div>
        )
    }

    styles = {
        textAlign: "center"
    }
}

export default NewNote;