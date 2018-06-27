import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";


class EditNote extends Component {
  constructor(){
    super();
    this.state = {
      id: '',
      title: "",
      content: ""
    };
}

  
  componentDidMount() {
    let token = localStorage.getItem('token');
    let requestOptions = {
      headers: {
        Authorization: token
      }
    }
    axios.get(`http://localhost:5000/notes/${this.props.match.params.id}`, requestOptions)
      .then(response => {
        console.log(response)
        this.setState({
          id: response.data._id,
          title: response.data.title,
          content: response.data.content
        })
      })
  }

  handleNoteInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleEdit = e => {
    e.preventDefault();
    let token = localStorage.getItem('token');
    let requestOptions = {
      headers: {
        Authorization: token
      }
    }
    axios.put(`http://localhost:5000/notes/${this.state.id}`, this.state, requestOptions)
    .then(() => {
      this.props.history.push(`/notes/${this.state.id}`);
    })
    .catch(err => {
      console.log(err)
    })

  };

  render() {
    return (
      <div className="col-sm-9 create-div">
        <div className="create-form">
          <div className="form-group">
            <h4>Edit Note:</h4>
          </div>
          <div className="form-group">
            <input
              className="form-title form-control"
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleNoteInput}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control form-content"
              rows="9"
              placeholder="Note Content"
              name="content"
              type="text"
              value={this.state.content}
              onChange={this.handleNoteInput}
            />
          </div>
          <button
            type="submit"
            className="create-button"
            onClick={this.handleEdit}
          >
            Update
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state[0].requestedUser.notes 
  };
};

export default connect(mapStateToProps, {  })(EditNote);