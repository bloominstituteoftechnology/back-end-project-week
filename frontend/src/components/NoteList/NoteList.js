import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  getNotes,
  deleteNote,
  filterByTag,
  filterByText
} from '../../store/actions/actions';
import NoteInput from '../NoteInput/NoteInput';
import { Card, CardBody, CardTitle, Button, Row, Col, Input } from 'reactstrap';
import Moment from 'moment';
import './NoteList.css';

class NoteList extends Component {
  state = {
    notes: [],
    tag: '',
    searchText: '',
    filtered: false,
    userId: null
  };

  componentDidMount() {
    this.setState({
      userId: this.props.user
    });
    this.props.getNotes(this.props.userId);
    this.setState({
      notes: this.props.notes
    });
  }

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  sortHighLow = () => {
    const notes = this.props.notes.sort((a, b) => {
      return b.rank - a.rank;
    });
    this.setState({
      notes
    });
  };

  sortLowHigh = () => {
    const notes = this.props.notes.sort((a, b) => {
      return a.rank - b.rank;
    });
    this.setState({
      notes
    });
  };

  searchByTag = () => {
    this.props.filterByTag(this.state.tag);
  };

  searchByText = () => {
    const target = this.state.searchText.toLowerCase();
    this.props.filterByText(target);
  };

  render() {
    return (
      <Row>
        <Col xs="3">
          <NoteInput />
        </Col>
        <Col xs="9">
          <Button onClick={() => this.props.getNotes()}>Get all</Button>
          {/* <Button onClick={() => this.sortLowHigh()}>Sort low to high</Button>
          <Button onClick={() => this.sortHighLow()}>Sort High to low</Button> */}
          {/* <div>
            <label htmlFor="tagSearch">Search by tag</label>
            <Input type="select" name="tag" onChange={this.inputChangeHandler}>
              <option defaultValue>Work</option>
              <option>Random</option>
              <option>School</option>
              <option>Home</option>
            </Input>
            <Button onClick={() => this.searchByTag()}>Search</Button>
          </div> */}
          <div>
            <label>Search by title</label>
            <input
              value={this.state.searchText}
              name="searchText"
              onChange={this.inputChangeHandler}
            />
            <button onClick={() => this.searchByText()}>Search</button>
          </div>

          <div className="NoteList">
            {this.props.notes.length > 0 ? (
              this.props.notes.map(note => (
                <NoteCard key={note._id} note={note} />
              ))
            ) : (
              <div>No Notes to display yet</div>
            )}
          </div>
        </Col>
      </Row>
    );
  }
}

const NoteCard = props => {
  return (
    <Card className="NoteCard" key={props.note.id}>
      <CardTitle>{props.note.title}</CardTitle>
      <CardBody>
        <div>{props.note.tag}</div>
        <div>
          <p>{`${props.note.text.substring(0, 25)}...`}</p>
          <p>{Moment(props.note.createdOn).fromNow()}</p>
          <Link to={`/notes/${props.note._id}`}>
            <Button>...</Button>
          </Link>
          <span>{props.note.rank}</span>
        </div>
      </CardBody>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    notes: state.reducer.notes,
    userId: state.reducer.user
  };
};

export default connect(mapStateToProps, {
  getNotes,
  deleteNote,
  filterByText,
  filterByTag
})(NoteList);
