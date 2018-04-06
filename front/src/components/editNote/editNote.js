import React, { Component } from "react";
import axios from "axios";

class EditNote extends Component {
    constructor(props){
        super(props);

        this.state = {
        }
    }

    componentDidMount = () => {
        this.setState({
            title: this.props.location.state.title,
            content: this.props.location.state.content,
            id: this.props.location.state.id
        });
    }

    handleChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
      }
    
    handleChangeNote = (event) => {
        this.setState({
            content: event.target.value
         })
    }
//{data: {title: this.state.title, content: this.state.content, id: this.props.location.state.id}}
    updateNote = () => {
        axios.put("http://localhost:3001/api/editNote", {id: this.state.id, title: this.state.title, content: this.state.content})
            .then(response => {
                console.log(`The note was updated!`)
            })
            .catch(err => {
                console.log(`There was an error with the axios put request updating the note: ${err}`)
            })
    }
    // update method, link save

    render(){
        return(
            <div className="editNote">
                <div className="editNote__header">
                    <p>Edit Note:</p>
                </div>

                <div className="editNote__input">
                    <form className="editNote__form">
                        <input className="editNote__form__title" value={this.state.title} onChange={this.handleChangeTitle} />
                        <textarea className="editNote__form__content" value={this.state.content} onChange={this.handleChangeNote} />
                        <div className="editNote__form__button">
                            <a href="/" className="editNote__form__content__link" style={this.styles}><p className="editNote__form__button__text" onClick={this.updateNote}>Save</p></a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    styles = {
        textDecoration: "none"
    }
}

export default EditNote;