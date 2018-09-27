import React, {Component} from "react"
import axios from 'axios';
import {Link} from 'react-router-dom'
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'


class SingleNote extends Component {
  state = {
    modal: false,
    loading: false,
    notes: {
      id: 42,
      title: 'Loading',
      body: 'Loading'
    }
  };

  componentDidMount(){
    const id = this.props.match.params.id
    //get note
    this.setState({loading: true});
    axios.get(`http://localhost:8000/api/notes/${id}`)
    .then(res => {
      this.setState({notes: res.data[0], loading:false})
      console.log(this.state.notes)
      console.log(this.props.history)
    })
    .catch( err => {
      console.log(err.response.data)
      this.setState({
      notes: { ...this.state.notes, title: err.response.status, body: err.response.data.error }
      })
    })
  }

  toggle = () => {
    this.setState( (prevState) => ({
      modal: !prevState.modal
    }));
  }
  render() {
    // const note = this.props.notes.find((each) => {
    //   return each.id == this.props.match.params.id
    // })
    const id = this.props.match.params.id
    console.log('render method this.state.tnes:',this.state.notes)
    return (<div >
      <Nav>
        <NavItem>
          <Link className='nav' to={`/edit/${this.state.notes.id}`}>
            Edit
          </Link>
        </NavItem>
        <NavItem >

          <a className = "nav" href ="#" onClick= {this.toggle}>Delete</a>

        </NavItem>
      </Nav>
      <h1>{this.state.notes.title}</h1>
      <p>{this.state.notes.body}</p>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalBody>
          Are you sure you want to delete this note?
        </ModalBody>
        <ModalFooter>
          <Button id = "yes" onClick={() => this.props.handleDelete( id, this.props.history.push)}>Yes</Button>{' '}
          <Button id = "no" onClick={this.toggle}>No</Button>
        </ModalFooter>
      </Modal>

    </div>);
  }
}

export default SingleNote;
