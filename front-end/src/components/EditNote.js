// COMPONENTS
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// STYLING COMPONENTS
import '../Styles.css';



class EditNote extends Component {
  constructor(props){
    super(props);
    this.state= {
      id: props.notes[props.match.params.id]._id,
      title: props.notes[props.match.params.id].title,
      text: props.notes[props.match.params.id].text,
    };
  };

  updateNote = () => {
    const self = this;
    const myNote = { title: this.state.title, text: this.state.text }
    axios.put(`https://my-bible-app.herokuapp.com/api/notes/${this.state.id}`, myNote)
        .then(updatedNote => {
            console.log(updatedNote);
        })
        .catch(err => {
            console.log(err);
        });
    self.setState({ title: '', text: ''});
  };

  render() {
    console.log('EditNote render props: ', this.props);
    console.log('id: ', this.state.id);
    return (
      <div className="APP__EDIT-NOTE">
        <h4>Edit Note:</h4>
        <input className="APP__EDIT-TITLE"
          type="text"
          placeholder="search"
          name="title"
          value = {this.state.title}
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
          />
        <textarea className="APP__EDIT-CONTENT"
          type="text"
          placeholder="Note Content"
          name="text"
          value={this.state.text}
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
          />
        <Link to="/"><button className="APP__EDIT-SAVE"
          onClick={ this.updateNote }>Save Changes</button></Link>
      </div>
    );
  };
};
  
export default EditNote;