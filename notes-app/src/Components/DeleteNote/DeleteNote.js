import React, { Component } from 'react';
import './index.css';
import axios from 'axios';
// import { deleteNote } from '../../actions';
// import { connect } from 'react-redux';


class DeleteNote extends Component {
    // state = {
    //     matched: [],
    //     title: '',
    //     content: ''
    // }

    // findMatch = () => {
    //     console.log("state title", this.state.title)
    //     console.log('props match', this.props.state.notes)
    //     let routeId = this.props.match.params.id;
    //     console.log("routeID", routeId, "typeof routeID:", typeof routeId);
    //     let matched = this.props.state.notes.filter( (item) => {
    //         console.log('item.id:', item.id, 'routeid:', routeId, 'item.id == routeId:', item.id == routeId);
    //         return item.id == routeId; 
    //     });
    //     console.log('matched:', matched);
    //     this.setState({ matched: matched });
    //     console.log("match?", this.state.matched);
    //     // let note = this.props.state.notes[0].title;
    //     // console.log(note);
    // }

    // componentDidMount = () => {
    //     let routeId = this.props.match.params.id;
    //     let matched = this.props.state.notes.filter( (item) => {
    //         return item.id == routeId; 
    //     });
    //     this.setState({ matched: matched[0] });
    //     this.setState({ title: matched[0].title})
    //     this.setState({ content: matched[0].content})

    // }

    handleDelete = () => {
        
        
        // this.props.deleteNote(this.props.toDelete);
        // this.props.history.push('/');
    }   


    render() {
        console.log('delete props', this.props.state)

        let toggle = this.props.toggle;

        return (
            <div className ={toggle ? "show_modal" : "hidden"}>
                <div className="modal">
                    <div className="question">Are you sure you want to delete this?</div>
                    <div>
                        <button 
                        className="red"
                        onClick={this.delete}
                        // onClick={this.props.showModal}
                        >
                            Delete
                        </button>
                        <button 
                        onClick={this.props.showModal}
                        >
                            No
                        </button>
                    </div>
                </div>
                <div className="gray_background"></div>
            </div>
        )
    }

    delete = event => {
        console.log("history", this.props)
        axios
            .delete(`http://localhost:5000/notes/${this.props.state.matched.id}`)
            .then(res => {
                console.log(res.data)
                this.props.history.push('/')
                // window.location.reload();
            })
            .catch(err => {
                console.log(err, 'err')
            })



    }



    // server.delete('/notes/:id', (req, res) => {

    //     db('notes').where({ id:req.params.id }).delete()
    //         .then((item) => {
    //             res.status(201).json(item);
    //             })
    //         .catch((fail) => {
    //             console.log(fail);
    //             res.status(404).json({ message: "The note with the specified ID didn't delete."});
    //             });
    
    // });


}

// export default connect(null, {deleteNote})(DeleteNote);
export default DeleteNote;