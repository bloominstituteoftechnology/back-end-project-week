import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editNote } from '../actions';

class EditNote extends Component {
  componentWillMount() {
    const note = this.props.location.note;
    if (!note) {
      this.props.history.push('/');
    } else {
      this.setState({
        title: note.title,
        content: note.content,
        id: note.id
      });
    }
  };

  state = {
    title: '',
    content: '',
    id: null
  };

  handleOnChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleEditNote = (event) => {
    event.preventDefault();
    const { title, content, id } = this.state;
    this.props.editNote({ title, content, id });
    this.props.history.push('/');
  };

  render() {
    if (!this.props.location.note) {
      this.props.history.push('/');
      return null;
    }
    return (
      <div>
        <div className="title">
          Edit Note:
        </div>
        <form onSubmit={this.handleEditNote}>
          <input
            className="input-title"
            value={this.state.title}
            name="title"
            type="text"
            placeholder="Note Title"
            onChange={this.handleOnChange}
          />
          <br />
          <textarea
            className="input-content"
            value={this.state.content}
            name="content"
            type="textbox"
            placeholder="Note Content"
            onChange={this.handleOnChange}
          />
          <br />
          <input className="button" type="submit" value="Update" />
        </form>
      </div>
    );
  };
}

// const mapStateToProps = (state) => {
//   return {
//   };
// }

export default connect(null, { editNote })(EditNote);
