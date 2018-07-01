import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }
 
 handleDeleteComment =() => {
    let postID = this.props.postID;
    let commentID = this.props.commentID;
    
    axios.delete(`http://localhost:5555/api/posts/${postID}/comment/${commentID}`, {
      headers: { authorization: localStorage.getItem('jwt') } 
    }).then(res => {
      //this.props.history.push("/posts")
      this.props.reset(this.props.postID);
    })
    .catch(err => {
      console.log("fail to delete");
    })
  
}

  render() {
    // createdBy={comment.username}
    // creatorID={comment.user}
    
    let displayDelete;
    if(this.props.createdBy === undefined) {
      displayDelete = <p>Loading...</p>;
    } else {
      if(this.props.creatorID == localStorage.getItem("id")){
        displayDelete = (<button className="comment-submit"type="click" onClick={this.handleDeleteComment}>
        delete
      </button>);
      }
    }

    return (
      <div>
      <div className="comment">
        <div className="delete-comment-div">
        {this.props.createdBy ? <h3>Commented by: {this.props.createdBy} </h3>: null}
          {displayDelete}
          {/* <button className="comment-submit"type="click" onClick={this.handleDeleteComment}>Delete Comment</button> */}
        </div >
        <div className="comment-content">
          {/* {this.props.createdBy ? <h3>Commented by: {this.props.createdBy} </h3>: null} */}
          <p>{this.props.comment}</p>
        </div>
      </div>
      <hr />
      </div>
    )
  }
}

export default withRouter(Comment);