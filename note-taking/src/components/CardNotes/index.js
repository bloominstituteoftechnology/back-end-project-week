import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class CardNotes extends Component {
  constructor(props) {
    super(props);
      this.state = {
        id: 0,
        notes: [],
        note: ''
    }
  }
  handleSetData = data => this.setState({ notes: data });

  componentDidMount() {
    const id = Number(this.props.match.params.id);
    Axios
     .get(`http://localhost:8000/api/${id}/notes`)
     .then(response => {
       console.log("GET RESPONSE: ", response);
       this.setState({ notes: response.data });
     })
     .catch(err => {
       console.log(err);
     });
  };

  deleteHandle = () => {
    const id = Number(this.props.match.params.id);
    Axios
     .delete(`http://localhost:8000/api/${id}/deletenotes`)
     .then(response => {
       console.log(response);
       console.log(response.data);
     })
  }

  render() {
    return(
    <div>
      <div>
        <br/>
        <div>
          <p>Title: </p>
          {this.state.notes.title}
        </div>
        <br/>
        <div>
          <p>Notes: </p>
          {this.state.notes.noteBody}
        </div>
        <br/>
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