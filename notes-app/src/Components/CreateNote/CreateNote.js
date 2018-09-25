import React, { Component } from 'react';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { createNote } from '../../actions/index';
import './index.css';



// const mapStateToProps = (state) => {
//     return {
//         notes: state
//     }
// }

class CreateNote extends Component {
    
        state = {
            title: '',
            content: '',
        }
    

    // componentWillMount(){
    //     let routeId = this.props.match.params.id;
    //     let matched = this.props.notes.filter((item)=>item._id === routeId)
    //     this.setState({ matched })
    // }

    // handleUpdate = () => {
    //     //action 2/3
    //     this.props.createNote(this.state.matched[0]);
    //     this.props.history.push('/');
    // }


    

    

    render() {
        return (
            <div className='create_view'>
                <form className="create_form" onSubmit={this.create}>
                    <h3 className="create_header">Create New Note: </h3>
                    <br />
                    <input 
                        className="create_title" 
                        type="text" 
                        placeholder="Note Title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        name="title"
                    />
                    <br /><br />
                    <textarea 
                        className="create_content" 
                        rows="20" 
                        placeholder="Note Content"
                        value={this.state.content}
                        onChange={this.handleChange}
                        name="content"
                    />
                        <br />
                    <button 
                    className="create_button"
                    onClick={this.handleUpdate}>Save</button>
                </form>
                <br /><br />
            </div>
        )
    }

    handleChange = (event) => {

        console.log(event.target.name)
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }


    create = event => { 
        event.preventDefault();
        console.log(this.props.history)
        
        axios
            .post('http://localhost:5000/notes', this.state)
            .then(res => {
                console.log(res.data);
                this.props.history.push('/');
                window.location.reload();
            })
            .catch(err => {
                console.log(err, 'err')
        });

    };

}

// export default connect(mapStateToProps, {createNote})(CreateNote);
export default CreateNote;

// server.post('/notes', (req, res) => {
//     const item = req.body;

//     db('notes').insert(item)
//         .then((ids)=> { 
//             res.status(201).json(ids);
//         })
//                 .catch((fail) => {
//                     console.log(fail);
//                     res.status(500).json({ error: "There was an error while saving the note to the database." });
//                 });
// });