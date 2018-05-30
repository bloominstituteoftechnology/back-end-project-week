import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { deleteNote } from '../actions.js';
import { connect } from 'react-redux';
import { Modal, ModalBody } from 'reactstrap';




class Here extends Component {
  constructor(props) {
    super(props);
    this.state = {
        notes: [],
     body: '',
     title: '',
     modal: false,
     id: this.props.location.state.currentNote._id
    }
  }
  componentDidMount() {
    let NoteId = this.props.location.state.currentNote._id;
}
//   getFriends = () => {
//     axios
//       .get(`http://localhost:5000/notes`)
//       .then(response => {
//         this.setState({ notes: response.data });
//       })  
//       .catch(err => {
//         console.log(err);
//       });
//     }
toggleModal = () => {
    this.setState({
        modal: !this.state.modal
    });
    console.log(this.props.location.state.currentNote._id)
}
bob = async (id) => {
    axios
    .delete(`https://lambda-notes-brandon.herokuapp.com/notes/${id}`)
    .then(response => {
        this.props.history.push('/');
        // console.log('what')
    })
    .catch(err => {
      console.log(err);
    });
    }


    render() {
        return(
            <div className="col-9 float-right pt-5 text-left">
            <div className="col-12 d-flex flex-row justify-content-end">
       <Link to={{pathname: `/editnote/${this.props.location.state.currentNote._id}`, state: { currentNote: this.props.location.state.currentNote}}}>
       <button >Edit</button>
       </Link>
       <button onClick={() => this.toggleModal()}>Delete</button>
       </div>
       {this.state.modal ? <Modal isOpen= {this.state.modal}>
       <ModalBody>
           Do you wish to delete this note?
           <div className="d-flex mt-3">
           {/* <Link onClick={ async () => await this.props.deleteNote(this.props.match.params.id)} to='/'>  */}
           <button className="redButton" onClick={() => this.bob(this.props.location.state.currentNote._id)} > Yes </button>
           {/* </Link> */}
            <button className="ml-3 tealButton" onClick={() => this.toggleModal()}> No</button>
            </div>
            </ModalBody>
            </Modal> : null}
<div >
<h3>{this.props.location.state.currentNote.title}</h3>
<br />
    <p>{this.props.location.state.currentNote.body}</p>
                         </div>
                         </div>
        )}
}
export default connect(null, { deleteNote })(Here);
// onClick={() => this.props.deleteNote(this.props.location.state.currentNote.id)}