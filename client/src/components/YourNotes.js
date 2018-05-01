import React, { Component } from 'react';
import { Card, CardTitle, CardText, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNotes } from '../actions/index';

class YourNotes extends Component {
  componentDidMount() {
    this.props.getNotes(this.props.users);
  }

  render() {
    return (
      <Container>
        <h2 className="yourNotes">Your Notes:</h2>
        <div className="cardsList">
          {this.props.notes.map(note => {
            return (
              <div className="cardList" key={note._id} note={note}>
                <Link to={`/notes/${note._id}}`}>
                  <Row>
                    <Card body>
                      <CardTitle>{note.title}</CardTitle>
                      <CardText>{note.text}</CardText>
                    </Card>
                  </Row>
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    notes: state.notes,
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { getNotes })(YourNotes);
