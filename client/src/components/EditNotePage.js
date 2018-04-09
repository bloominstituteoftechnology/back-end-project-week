import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../actions";
import {Button} from "react-bootstrap";
import axios from "axios";

class EditNotePage extends React.Component {

  state = {
    note: {
      title: '',
      message: ''
      
    }
  };

  componentDidMount() {
    const noteId = this.props.match.params.id;

    if (this.props.notes.length) {
      const note = this.props.notes.filter(e => e._id === noteId)[0];
      this.setState({note});
    } else {
      axios({
        method: "GET",
        url: `http://localhost:5000/api/notes/${noteId}`,
        headers: {"Authorization": window.localStorage.getItem("jwt_token")}
      }).then(res => {
        this.setState({note: res.data});
      })
    }
  }

  setTitle = (event) => {
    const note = this.state.note;
    note.title = event.target.value;
    this.setState({note});
  };

  setMessage = (event) => {
    const note = this.state.note;
    note.message = event.target.value;
    this.setState({note});
  };

  updateNote = event => {
    const {
      title,
      message,
      _id
    } = this.state.note;

    event.preventDefault();

    axios({
      method: "PUT",
      url: `http://localhost:5000/api/notes/${_id}`,
      headers: {"Authorization": window.localStorage.getItem("jwt_token")},
      data: {title, message}
    }).then(() => {
      this.props.history.push(`/view-note/${_id}`);
    });
  };

  render() {
    const {
      note
    } = this.state;

    return (
      <form onSubmit={this.updateNote}>
        <h4>Edit Note</h4>
        <div className="row" style={{marginTop: "40px"}}>
          <div className="col-md-5">
            <input
              type="text"
              value={note.title}
              style={{width: "100%"}}
              placeholder="Note Title"
              onChange={this.setTitle}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5" style={{marginTop: "15px"}}>
            <textarea
              value={note.message}
              style={{width: "100%"}}
              rows={5}
              placeholder="Note Message"
              required
              onChange={this.setMessage}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3" style={{marginTop: "15px"}}>
            <Button type="submit">
              Update
            </Button>
          </div>
        </div>
      </form>
    );
  }
}


function mapStateToProps(state) {
  return {
    notes: state.notes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNotePage);