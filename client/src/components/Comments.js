import React from "react";
import Comment from "./Comment";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.comments) {
      this.setState({ comments: nextProps.comments });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let note = {
      comment: this.state.comment
    };
    let id = this.props.id;
    
    axios.post(`http://localhost:5555/api/posts/comment/${id}`,  note, {
      headers: { authorization: localStorage.getItem('jwt') } 
    })
      .then(posts => {
        
        this.setState({comment: ""});
        this.props.reset(this.props.id);

        // console.log(this.state);
        //this.props.history.push("/posts");
      })
      .catch(err => {
        console.log("bad no posts");
        console.log(err);
        // this.props.hisory.push("/posts")
      })
  }

  render() {
    return (
      <div>
        <h3>Comments</h3>
        <form onSubmit={this.handleSubmit}>
        <textarea 
          className="add-comment"
          value={this.state.comment}
          placeholder="Add Comment.."
          name="comment"
          required
          onChange={this.handleChange}
        >
        </textarea>
          <button type="submit" className="comment-submit">Submit Comment</button>
        </form>
        <div className="comments-list">
        {this.state.comments.map((comment, index) => {
          return (
            <Comment 
              key={index}
              comment={comment.comment}
            />
          )
        })}
        </div>
      </div>
    )
  }
}

export default withRouter(Comments);