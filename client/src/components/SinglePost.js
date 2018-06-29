import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Comments from "./Comments";

class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    }
  }

  resetState = (id) => {
    //let id = this.props.match.params.id;
    console.log(id);
    axios.get(`http://localhost:5555/api/posts/${id}`, {
      headers: { authorization: localStorage.getItem('jwt') } 
    })
      .then(foundPost => {
        this.setState({post: foundPost.data});
      })
      .catch(err => {
        console.log("error");
      })
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    console.log(id);
    axios.get(`http://localhost:5555/api/posts/${id}`, {
      headers: { authorization: localStorage.getItem('jwt') } 
    })
      .then(foundPost => {
        this.setState({post: foundPost.data});
      })
      .catch(err => {
        console.log("error");
      })
  }

  handleDeleteNote = (id) => {
    axios.delete(`http://localhost:5555/api/posts/${id}`, {
      headers: { authorization: localStorage.getItem('jwt') } 
    })
      .then(deletedNote => {
        console.log(deletedNote);
        this.props.history.push("/posts")
      })
      .catch(err => {
        console.log("cant delete note")
      })
  }

  render() {
    console.log(this.state);
    return (
      <div className="show-wrapper">
        <section className="edit-delete">
          <Link to="/posts">
            <button >
              edit
            </button>
          </Link>
          <button onClick={() => this.handleDeleteNote(this.state.post._id)}>
            delete
          </button>
        </section>
        
        <section className="show-content">
          <h1>{this.state.post.title}</h1>
          <p>{this.state.post.content}</p>
        </section>
        <section className="comments">
          <Comments 
            reset={this.resetState}
            id={this.state.post._id} 
            comments={this.state.post.comments}/>
        </section>
      </div>
    )
  }
}

export default SinglePost;