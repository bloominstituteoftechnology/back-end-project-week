import React, { Component } from 'react';
import { connect } from 'react-redux';
// import actions
import { updateNote } from '../actions';
import './NoteUpdate.css';
// create update method
// use Friendform as template
class UpdateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.data.name,
      date: this.props.data.date,
      text: this.props.data.text,
      save: false,
    };
  }

  //  create update/submit handlers

  handleUpdate = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitUpdate = event => {
    event.preventDefault();
    const update = {
      index: this.props.index,
      update: {
        title: this.state.title,
        date: this.state.date,
        text: this.state.text,
      },
    };
    let active = this.state.save;
    this.props.updateNote(update);
    this.setState({ save: !active });

    console.log(update);
  };
  render() {
    return (
      <form style={this.state.save ? { display: 'none' } : null}>
        <input
          className="title"
          type="text"
          placeholder="title"
          name="title"
          value={this.props.title}
          onChange={this.handleUpdate}
        />
        <input
          className="date"
          type="text"
          placeholder="date"
          name="date"
          value={this.props.date}
          onChange={this.handleUpdate}
        />
        <textarea
          rows={10}
          className="text"
          type="text"
          placeholder="text"
          name="text"
          value={this.props.text}
          onChange={this.handleUpdate}
        />
        <button className="Save" onClick={this.submitUpdate}>Save</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    noteUpdated: state.noteUpdated,
  };
};

// connect components for update
export default connect(mapStateToProps, { updateNote })(UpdateNote);
