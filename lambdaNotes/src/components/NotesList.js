import React from "react";
import axios from "axios";
import {
  LeftBar,
  StyledLink,
  ContainCards,
  NotesH2,
  CardList,
  TitleH1,
  ExportBtn,
  SignOut
} from "../Styles";

import NoteCard from "./NoteCard";
import Payments from "./Payments";

class NotesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      credits: 0,
      filteredNotes: []
    };
  }

  componentDidMount() {
    axios
      .get("/notes")
      .then(response => this.setState({ data: response.data }))
      .catch(error => console.log(error));

    this.getCredits();
  }

  exportCsv() {
    let csvRow = [];
    let A = [["id", "id", "title", "textbody"]];
    let re = this.state.data;

    for (let item = 0; item < re.length; item++) {
      A.push([re[item]._id, re[item].title, re[item].textBody]);
    }
    for (let i = 0; i < A.length; ++i) {
      csvRow.push(A[i].join(","));
    }
    let csvString = csvRow.join("%0A");
    let a = document.createElement("a");
    a.href = "data:attachment/csv" + csvString;
    a.target = "_blank";
    a.download = "Notes.csv";
    document.body.appendChild(a);
    a.click();
  }

  getCredits = credit => {
    axios
      .get("/api/current_user")
      .then(res => {
        console.log(res);
        if (res.data._id) {
          this.setState({ credits: res.data.credits });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <LeftBar>
          <SignOut onClick={this.props.signOut}>Sign Out</SignOut>
          <TitleH1>Lambda Notes</TitleH1>
          <StyledLink to={"/"}>View Your Notes</StyledLink>
          <StyledLink to={"/note/create"}>Add New Note</StyledLink>
          <ExportBtn
            onClick={() => {
              this.exportCsv();
            }}
          >
            Export
          </ExportBtn>
          <Payments handlePayment={this.getCredits}/>
          <div style={{ margin: '10px 0' }}>Credits: {this.state.credits}</div>
        </LeftBar>
        <CardList>
          <NotesH2>Your Notes:</NotesH2>
          <ContainCards>
            {this.props.notes.map(note => (
              <NoteCard
                key={note.id}
                note={
                  this.state.filteredNotes.length > 0
                    ? this.state.filteredNotes
                    : note
                }
              />
            ))}
          </ContainCards>
        </CardList>
      </div>
    );
  }
}

export default NotesList;
