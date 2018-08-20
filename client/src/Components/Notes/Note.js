import React, { Component } from 'react';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }

  render() {
    return (
      <div className="noteCard">
        <div className="noteCard__title">
          {this.state.title}
        </div>
        <div className="noteCard__body">
          {this.state.content}
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.match) {
      const currentID = this.props.match.params.id;
      const note = this.props.notes.filter(n => n._id === currentID);
      this.setState({ title: note[0].title, body: note[0].textBody });
    } else {
      this.setState({ title: this.props.title, body: this.props.body });
    }
  }
}

export default Note;