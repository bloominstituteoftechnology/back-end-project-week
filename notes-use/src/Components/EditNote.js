import React from 'react';
import axios from 'axios';

class EditNote extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title : '',
            content : '',
            isMounted:false
        }
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name] : event.target.value });
    }

    componentDidMount() {
        axios
            .get(`http://localhost:3300/api/notes/${this.props.match.params.id}`)
            .then(response => {
                console.log("Editnote..axios..response  ", response.data)

                        this.setState({ title : response.data[0].title,
                            content : response.data[0].content})})
            .catch(error => console.log(error));
    }

    editNote = () => {
        const editedNote = {
            title : this.state.title,
            content : this.state.content
        }
        this.setState({title : '', content : ''});
        axios
            .put(`http://localhost:3300/api/notes/${this.props.match.params.id}`, editedNote)
            .then(response => this.props.history.push('/notes'))
            .catch(error => console.log(error));
    }
    
    render() {
        return (
            <div className = "create-note-main-div">
                <h3>Editing....</h3>

                <div className = "form">
                    
                    <input name = 'title'
                           type = 'text' 
                           placeholder = {this.state.title}
                           value = {this.state.title}
                           onChange={this.handleInputChange}
                    />

                    <textarea name = 'content' 
                           type = 'text'
                           placeholder = {this.state.content}
                           value = {this.state.content} 
                           onChange = {this.handleInputChange}
                    />

                    <button onClick = {this.editNote}> Save </button>
                </div>
            </div>
        )
    }
}

export default EditNote;