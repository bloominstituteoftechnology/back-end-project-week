import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNote } from '../../store/actions/actions';

class NoteInput extends Component {
  state = {
    title: '',
    text: '',
    checklist: [],
    rank: 5,
    tag: '',
    userId: null
  };

  componentDidMount() {
    this.setState({
      userId: this.props.user
    });
  }

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.addNote(this.state);
    console.log(this.state);
    this.setState({
      title: '',
      text: '',
      rank: '5',
      tag: '',
      checklist: []
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="title">Title</label>
          <input
            onChange={this.inputChangeHandler}
            name="title"
            id="title"
            value={this.state.title}
          />

          <label htmlFor="text">Text</label>
          <input
            onChange={this.inputChangeHandler}
            name="text"
            id="text"
            value={this.state.text}
          />
          <select
            onChange={this.inputChangeHandler}
            value={this.state.rank}
            name="rank"
          >
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>

          <select
            onChange={this.inputChangeHandler}
            value={this.state.tag}
            name="tag"
          >
            <option>Work</option>
            <option>Random</option>
            <option>School</option>
            <option>Home</option>
          </select>

          <button>add</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.reducer.user
  };
};

export default connect(mapStateToProps, { addNote })(NoteInput);
