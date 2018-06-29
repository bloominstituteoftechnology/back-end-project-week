import React from "react";

class Comment extends React.Component {

  handleDeleteNote() {

  }

  render() {
    return (
      <div>
      <div className="comment">
        <div className="delete-comment-div">
          <button className="comment-submit"type="click">Delete Comment</button>
        </div >
        <div className="comment-content">
          <h3>XANG</h3>
          <p>{this.props.comment}</p>
        </div>
      </div>
      <hr />
      </div>
    )
  }
}

export default Comment;