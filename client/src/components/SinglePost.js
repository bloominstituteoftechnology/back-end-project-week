import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import { SSL_OP_TLS_BLOCK_PADDING_BUG } from "constants";

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

  signout = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');

      this.props.history.push('/signin');
    }
  };

  render() {
    console.log(this.state);
    // if(this.state.post.user.userID == localStorage.getItem("id")) {
    //   console.log(true);
    // }

    let displayDelete;
    if(this.state.post.user === undefined) {
      displayDelete = <p>Loading...</p>;
    } else {
      if(this.state.post.user.userID == localStorage.getItem("id")){
        displayDelete = (<button onClick={() => this.handleDeleteNote(this.state.post._id)}>
        delete
      </button>);
      }
    }
    let displayCreater;
    if(this.state.post.user === undefined) {
      displayCreater = <p>Loading...</p>;
    } else {
      if(this.state.post.user.username) {
        displayCreater = (
          <button>Posted by: {this.state.post.user.username}</button>
        )
      }
    

    }
    return (
      <div className="show-wrapper">
        <section className="edit-delete">
          <Link to="/posts">
            {displayCreater}
          </Link>
          {displayDelete}
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