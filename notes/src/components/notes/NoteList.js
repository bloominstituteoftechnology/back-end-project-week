import React, { Component } from "react";
import NoteCard from "./NoteCard";
import axios from "axios";
import { connect } from "react-redux";
import { getNotes } from "../../store/actions/noteActions";
import styled from "styled-components";

const NoteView = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: none;
  flex-direction: row-reverse;
  width: 100%;
  margin-top: 16px;
  flex-wrap: wrap;
`;
const Title = styled.div`
  font-size: 20px;
  padding: 20px;
  width: 100%;
  text-align: left;
  color: #4a4a4a;
  text-align: left;
  font-size: 20px;
  line-height: 30px;
  font-family: "Helvetica", "Arial", sans-serif;
  font-weight: bolder;
  margin-top: 30px;
`;

const Card = styled.div`
  border-bottom: 1px solid lightgrey;
  display: flex;
  justify-content: space-between;
  align-items: none;
  flex-direction: column;
  background-color: #fff;
  width: 380px;
  margin: 40px;
  padding: 24px;
`;
class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      search: ""
    };
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }
  componentDidMount() {
    // call our action
    this.props.getNotes()
    
  }

  render() {
    const { notes } = this.props;
    console.log(notes);
    let filteredNotes = notes.filter(note => {
      return (
        note.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    return (
      <div className="notes">
        <p>Search Notes</p>
        <input
          type="text"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        />
        <Title>Your Notes:</Title>

        <NoteView>
          {notes.length < 1 ? (
            <div>No Notes</div>
          ) : (
            filteredNotes.map(note => <NoteCard key={note.id} note={note} />)
          )}
        </NoteView>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.note.notes
  };
};

export default connect(mapStateToProps, {getNotes})(NoteList);
