import React from "react";
import { Link } from "react-router-dom";

class Post extends React.Component {
  render() {
    return (
      <div className="note-card">
        <Link to={`/posts/${this.props.id}`} >
          <h2>{this.props.title}</h2>
        </Link>
        <p>{this.props.content}</p>
      </div>
    )
  }
}

export default Post;