import React, { Component } from 'react';
import Button from '../Button';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {
        id: null,
        title: '',
        content: ''
      }
    };
  }

  handleInputChange = e => {
    const note = this.state.note;
    note[e.target.name] = e.target.value;
    this.setState({ note: note });
  };

  onSubmit = () => {
    this.props.onSubmitNote(this.state.note);
    this.setState({note: {
      id: null,
      title: '',
      content: ''
    }});
    console.log('click save', this.state.note);
  };

  componentDidUpdate = prevProps => {
    if(prevProps.note !== this.props.note) {
      this.setState({
        note: {
          id: this.props.note.id,
          title: this.props.note.title,
          content: this.props.note.content
        }
      });
    }
  };

  componentDidMount = () => {
      this.setState({note: {
        id: Date.now(),
        title: '',
        content: ''
      }});   
  };

  render() {

    return (
      <form>
        <input 
          id="title" 
          name="title" 
          className="form__title" 
          type="text" 
          placeholder="Note Title"
          value={this.state.note.title}
          onChange={this.handleInputChange} />
        <textarea 
          id="content" 
          name="content" 
          className="form__content" 
          wrap="hard" placeholder="Note Content"
          value={this.state.note.content}
          onChange={this.handleInputChange} />
        <Button 
          type="submit" 
          onButtonClick={this.onSubmit} 
          text={this.props.buttonText} />
      </form>
    );
  }
};

export default Form;