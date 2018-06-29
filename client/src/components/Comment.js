import React from "react";

class Comment extends React.Component {

  handleDeleteNote() {

  }

  render() {
    console.log(this.props)
    return (
      <div className="comment">
        <div className="delete-comment-div">
          <button type="click">Delete Comment</button>
        </div >
        <div className="comment-content">
          <h3>XANG</h3>
          <p>{this.props.comment}</p>
        </div>
      </div>
    )
  }
}

export default Comment;