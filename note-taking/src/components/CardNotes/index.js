import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class CardNotes extends Component {
  state = {
    id: 0,
    notes: [],
    note: ''
  }

  handleSetData = data => this.setState({ notes: data });


  componentDidMount() {
    // const id = Number(this.match.params.id);
    Axios
     .get(`http://localhost:8000/api/:id/notes`)
     .then(response => {
       console.log("GET RESPONSE: ", response);
       this.setState({ notes: response.data });
     })
     .catch(err => {
       console.log(err);
     });
  };

  deleteHandle = () => {
    Axios
     .delete(`http://localhost:8000/api/:id/deletenotes`)
     .then(response => {
       console.log(response);
       console.log(response.data);
     })
  }

  render() {
    return(
    <div>
      <div>
        {this.state.notes.title}
        {this.state.notes.noteBody}
      </div>
      <Link to={`/${this.state.notes.id}/editnotes`}>
      Edit Notes
      </Link>
      <Link to>
        <div onClick={this.deleteHandle} > Delete </div>
      </Link>
    </div>
    )
  }
}

export default CardNotes;