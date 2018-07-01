import React from "react";
import axios from "axios";
import Post from "./Post";

class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:5555/api/posts/all', {
      headers: { authorization: localStorage.getItem('jwt') } 
//take the token from localStorage and put it on headers ('authorization is my own header')
  })
      .then(posts => {
        this.setState({posts: posts.data});
        console.log(this.state);
      })
      .catch(err => {
        console.log("bad no posts");
      })
  }
  render() {
    return (
      <div className="notes-list">
        {this.state.posts.map((post, index) => {
         return <Post
          key={index}
          title={post.title}
          content={post.content}
          author={post.user}
          id={post._id}
          />
         
        })}
      </div>
    )
  }
}

export default Posts;