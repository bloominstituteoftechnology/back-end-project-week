import React, { Component } from 'react';
import axios  from 'axios';

class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    };
  }

  createNote = event => {
    event.preventDefault();
    if (this.state.title === '' || this.state.content === '') {
      alert('Please enter credentials!');
      return;
    }

    const newNote = {
      title: this.state.title,
      content: this.state.content
    };

    axios
      .post('http://localhost:8000/api/NewNote', newNote)
      .then(response => {
        const token = response.data;
        localStorage.setItem('token', token)
        this.props.history.push('/api/Notes')
        alert('Success!');
      })
      .catch(err => {
        console.error('Axios Failed');
      })
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
        <div className="mainContent" >
            <div className="directory__title mainContent__title" >
                Create New Note:
            </div>
            <div className="mainContent__content">
                <form className="mainContent__Form" onSubmit={this.createNote} >
                    <input
                        className="form__input form__input--title"
                        onChange={this.handleInputChange}
                        placeholder="Note Title"
                        value={this.state.title}
                        name="title"
                    />
                    <textarea
                        className="form__input form__input--body"
                        type="textarea"
                        onChange={this.handleInputChange}
                        placeholder="Note Content"
                        value={this.state.content}
                        name="content"
                    />
                        <button className="link__button" type="submit">Save</button>
                </form>
            </div>
        </div>
    )
  }
}

export default NewNote;