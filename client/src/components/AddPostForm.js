import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class AddPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let note = {
      title: this.state.title,
      content: this.state.content
    };

    axios.post('http://localhost:5555/api/posts',  note, {
      headers: { authorization: localStorage.getItem('jwt') } 
//take the token from localStorage and put it on headers ('authorization is my own header')
    })
      .then(posts => {
        console.log(posts)
        this.setState({title: "", content: ""});
        // console.log(this.state);
        this.props.history.push("/posts");
      })
      .catch(err => {
        console.log("bad no posts");
        console.log(err);
        // this.props.hisory.push("/posts")
      })
    // this.props.addNote(note);
    // this.setState({title: "", body: ""});
    // this.props.history.push("/posts");
  }

  render() {
    return (
      <div className="add-note">
        <h2>Create Note</h2>
        <form onSubmit={this.handleSubmit}>
            <input
              className="add-title"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
              required
              placeholder="Enter Title"
            />
            <br />
            <textarea
              className="add-body"
              onChange={this.handleChange}
              value={this.state.content}
              type="text"
              name="content"
              required
              placeholder="Notes..."
            >
            </textarea>
            <br />
            <button className="add-btn">
              Add Note
            </button>
          </form>
        </div>
    )
  }
}

export default withRouter(AddPostForm);