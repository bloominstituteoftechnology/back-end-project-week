import React from 'react';
import { Link } from 'react-router-dom';

import './CreateNote.css';

export default class EditNote extends React.Component {
  state = {
    _id: '',
    title: '',
    body: '',
  };

  componentDidMount() {
    this.setState({
      _id: this.props.note._id,
      title: this.props.note.title,
      body: this.props.note.body,
    });
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = _ => {
    const { _id, title, body } = this.state;
    this.props.handleEditNote({ _id, title, body });
    this.setState({ _id: '', title: '', body: '', });
  };

  render() {
    const { title, body } = this.state;
    return (
      <div className="CreateNote">
        <h2 className="SectionTitle">Edit Note:</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            className="CreateNote-TitleBox"
            value={title}
            name="title"
            type="text"
            onChange={this.handleInputChange}
            maxLength="32"
            required
          />
          <br />
          <textarea
            className="CreateNote-BodyBox"
            value={body}
            name="body"
            type="text"
            onChange={this.handleInputChange}
            required
          />
          <br />
          <Link to={"/view"}><button onClick={() => this.handleSubmit()} type="submit">Update</button></Link>
        </form>
      </div>
    );
  };
}
