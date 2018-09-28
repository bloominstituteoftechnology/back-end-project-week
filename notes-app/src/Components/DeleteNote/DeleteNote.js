import React, { Component } from 'react';
import './index.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { deleteNote } from '../../actions';
// import { connect } from 'react-redux';



class DeleteNote extends Component {
    

    render() {
        console.log('delete props', this.props.state)

        let toggle = this.props.toggle;

        return (
            <div className ={toggle ? "show_modal" : "hidden"}>
                <div className="modal">
                    <div className="question">Are you sure you want to delete this?</div>
                    <div>
                        <Link to="/notes"><button 
                        className="red"
                        onClick={this.delete}
                        >
                            Delete
                        </button></Link>
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
                // this.props.history.push('/')
                window.location.reload();
            })
            .catch(err => {
                console.log(err, 'err')
            })
    }

}


export default DeleteNote;