import React, { Component } from "react";
import { connect } from "react-redux";
// import { createNote } from "../actions";
import axios from "axios";




class CreateNote extends Component {
  state = {
    title: '', content: '', userId: ''
  };

  componentDidMount() {
    this.setState({
      userId: localStorage.getItem('userId')
    })
  }


  handleNoteInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSave = e => {
      e.preventDefault();
      let token = localStorage.getItem('token');
      axios.post(`http://localhost:5000/notes`, this.state, {headers: { authorization: token } })
        .then(() => {
          this.setState({ title: "", content: ""});
          this.props.history.push('/');
        })
        .catch(err => {
          console.log(err.message)
        })
  }

  render() {
      return <div className="col-sm-9 create-div">
          <div className='create-form-div'>
            <div className="form-group">
              <h4>Create New Note:</h4>
            </div>
            <div className="form-group">
              <input className="form-title form-control" placeholder="Note Title" name='title' type="text" value={this.state.title} onChange={this.handleNoteInput} />
            </div>
            <div className="form-group">
              <textarea className="form-control form-content" rows="9" placeholder="Note Content" name='content' type="text" value={this.state.content} onChange={this.handleNoteInput} />
            </div>
            <button type="submit" className="create-button" onClick={this.handleSave}>
              Save
            </button>
          </div>
        </div>;
  }


}

export default connect(null, { })(CreateNote);