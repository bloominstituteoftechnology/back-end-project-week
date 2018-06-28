import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import './NotesContainer.css';

class NotesContainer extends Component {
    render() {
        console.log('Username', this.props.username);
        return (
            <div className='notesContainer'>
                <h4>{this.props.username} Notes:</h4>
                <div className='notes'>
                    {this.props.notes !== undefined ?
                        this.props.notes.map(note => {
                            return (
                                <Link className='link' key={note.id} to={`/notes/${note.id}`}>
                                    <Card>
                                        <CardBody>
                                            <CardTitle>{note.title}</CardTitle>
                                            <CardText>{note.text}</CardText>
                                        </CardBody>
                                    </Card>
                                </Link>
                            )
                        }) : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return (
        {
            username: state.userData.username,
            notes: state.userData.notes
        }
    )
}

export default withRouter(connect(mapStateToProps)(NotesContainer)); 