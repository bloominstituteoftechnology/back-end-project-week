import React from "react";
import axios from "axios";

class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/posts/all', {
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
      <div>Posts</div>
    )
  }
}

export default Posts;