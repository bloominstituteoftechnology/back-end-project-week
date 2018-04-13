import React, { Component } from "react";
import { connect } from "react-redux";
import { editNote } from "../actions";
import { Redirect } from "react-router-dom";

class EditView extends Component {
  state = {
    title: this.props.notes.title,
    text: this.props.notes.text,
    id: this.props.id,
    fireRedirect: false
  };

  componentWillMount() {
    const noteToEdit = this.props.notes.find(each => each._id === this.props.id)
    this.setState({ title: noteToEdit.title, text: noteToEdit.text });
  }

  render() {
    return (
      <div className="EditView">
        <div className="header" />
        <h2>Edit Note:</h2>
        <div className="NewNote">
          <form onSubmit={this.handleSubmit}>
            <input
              autoFocus="true"
              type="text"
              name="title"
              placeholder="Note Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <textarea
              name="text"
              placeholder="Note Content"
              value={this.state.text}
              onChange={this.handleChange}
            />
            <button>Update</button>
          </form>
          {this.state.fireRedirect && <Redirect to="/home" />}
          {}
        </div>
      </div>
    );
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.editNote(this.state);
    this.setState({ fireRedirect: true });
  };
}

const mapStateToProps = state => {
  console.log('props.id is', this.props);
  return {
    notes: state.notes,
  };
};

export default connect(mapStateToProps, { editNote })(EditView);
