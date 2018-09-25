import React, { Component } from 'react';
import './index.css';
import axios from 'axios';





class EditNote extends Component {
    
    state = {
        matched: [],
        title: '',
        content: ''
    }


    findMatch = () => {
        console.log("state title", this.state.title)
        console.log('props match', this.props.state.notes)
        let routeId = this.props.match.params.id;
        console.log("routeID", routeId, "typeof routeID:", typeof routeId);
        let matched = this.props.state.notes.filter( (item) => {
            console.log('item.id:', item.id, 'routeid:', routeId, 'item.id == routeId:', item.id == routeId);
            return item.id == routeId; 
        });
        console.log('matched:', matched);
        this.setState({ matched: matched });
        console.log("match?", this.state.matched);
        // let note = this.props.state.notes[0].title;
        // console.log(note);
    }


    componentDidMount = () => {
        let routeId = this.props.match.params.id;
        let matched = this.props.state.notes.filter( (item) => {
            return item.id == routeId; 
        });
        this.setState({ matched: matched[0] });
        this.setState({ title: matched[0].title})
        this.setState({ content: matched[0].content})

    }



    handleChange = (event) => {
        console.log(event.target.name)
        this.setState({[event.target.name]: event.target.value})

        // let temp = Array.from(this.state.matched);
        // temp[0][event.target.name] = event.target.value;
        // this.setState({ matched: temp })
    }


    cancelButton = () => {
        window.location.reload();
    }



    render() {
        console.log("matched?", this.state.title)
        return (
            <div className='edit_view'>
                <form className="edit_form" onSubmit={this.edit}>
                        <br /><br />
                <h3 className="edit_header">Edit Note: </h3>

                        <br />

                    <input 
                        className="edit_title" 
                        type="text" 
                        onChange={this.handleChange}
                        value={this.state.title}
                        name='title'
                    />

                            <br /><br />

                    <textarea 
                        className="edit_content" 
                        rows="20" 
                        onChange={this.handleChange} 
                        value={this.state.content}
                        name='content'
                    />
                    
                    <br />

                    <button 
                        className="edit_button"
                        onClick={this.handleUpdate}
                        
                            >Update
                    </button>
                    <button 
                        className="cancel_button"
                        onClick={this.cancelButton}
                        
                            >Undo Changes
                    </button>

                </form>
            </div>
        )
    }

    // edit = event => { 
    //     // event.preventDefault();
    //     console.log("history?", this.props.history)

        
    //     axios
    //         .put(`http://localhost:5000/notes/${this.state.matched.id}`, {
    //             title: this.state.matched.title,
    //             content: this.state.matched.content
    //         })
    //         .then(res => {
    //             console.log("data?", res.data);

    //             this.props.history.push('/');
    //             window.location.reload();
    //         })
    //         .catch(err => {
    //             console.log(err, 'err')
    //     });

    // };



}

//action 3/3
// export default connect(mapStateToProps, {editNote})(EditNote);
export default EditNote;

