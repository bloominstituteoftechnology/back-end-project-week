import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editData } from '../../actions/index';

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      content: '',
      index: ''
    };
  }
  componentDidMount() {
    this.handleInitialState();
  }
  render() {
    return (
      <div>
        <h2 className="page-title">Edit Note:</h2>
        <form action="" className="form">
          <h3 className='form-section-heading'>Title:</h3>
          <input
            className="form-input-title"
            name="title"
            value={this.state.title}
            placeholder="...Title"
            type="text"
            onChange={this.handleInputChange}
          />
          <h3 className='form-section-heading'>Notes:</h3>
          <input
            className="form-input-content"
            name="content"
            value={this.state.content}
            placeholder="...Content"
            type="text"
            onChange={this.handleInputChange}
          />
          <button className="button-nav hey" onClick={this.handleSubmit}>
            Save
          </button>
        </form>
      </div>
    );
  }
  handleInitialState = () => {
    let id = this.props.match.params.id;
    id = parseInt(id, 10);
    let thisIndex;
    let currentNote = this.props.notes.find((note, index)=> {
      thisIndex = index;
      return note.id === id;
    });
    // console.log('thisIndex:', thisIndex);
    this.setState({
      id: currentNote.id,
      title: currentNote.title,
      content: currentNote.content,
      index: thisIndex
    });
  };
  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const changedNote = {
      id: this.state.id,
      title: this.state.title,
      content: this.state.content,
      index: this.state.index
    };
    // console.log('changedNote',changedNote);
    this.props.editData(changedNote);
    // console.log('props', this.props);
    // console.log('here', this.state);
  };
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { editData })(Edit);
