import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { deleteNote, fetchNotes } from "../actions";


class Note extends Component {
    constructor(props) {
        super(props)
        this.state = {
          note: {
            title: 'fetching title...',
            content: 'fetching content...'
          },
            modalActive: false
        }

    }

    toggle = (e) =>  {
        e.preventDefault();
        this.setState({ modalActive: !this.state.modalActive})
    }
    
    handleDeleteButton = (e, id) => {
        e.preventDefault();
        this.props.deleteNote(id);
        window.location.href="/";
    }
    componentWillMount() {
      let userId = localStorage.getItem('userId')
      if (userId) this.props.fetchNotes(userId)
      // let result = this.props.notes.filter(note => note._id == this.props.match.params.id);
      // let found = result[0]
      // console.log('found', found)
      // if (found) this.setState({ note: found });
    }

    componentDidMount() {
      // let result = this.props.notes.filter(note => note._id == this.props.match.params.id);      
      // let found = result[0]
      // console.log('found', found)
      // if(found) this.setState({note: found});
    }

    render() {
      let found = {
        title: 'fetching title...',
        content: 'fetching content...'
      }
      let result = this.props.notes.filter(note => note._id == this.props.match.params.id);
      if(result[0]) found = result[0]
      console.log('found', found)
      console.log(this.props)
      console.log(this.state)
        return <div className="col-sm-9 note-view">
            <div className="note-links-wrap">
              <Link to={`/edit/${found._id}`} className="note-link">
                edit
              </Link>
              <Link to="/" className="note-link" onClick={this.toggle}>
                delete
              </Link>
            </div>
            <div>
              <h4 className="mb-sm-3">{found.title}</h4>
              <p>{found.content}</p>
            </div>

            <Modal isOpen={this.state.modalActive} toggle={this.toggle} className="modal-wrap">
              <ModalBody className="modal-body">
                Are you sure you want to delete this?
              </ModalBody>
              <ModalFooter className="but-wrapper">
                <Button color="danger" className="modal-but" onClick={e => {
                    this.handleDeleteButton(e, this.props.match.params.id);
                  }}>
                  Delete
                </Button> <Button className="no-button modal-but" onClick={this.toggle}>
                  No
                </Button>
              </ModalFooter>
            </Modal>
          </div>;
    }
}

const mapStateToProps = state => {
  return {
    notes: state[0].requestedUser.notes    
  };
};

export default connect(mapStateToProps, { deleteNote, fetchNotes })(Note);

