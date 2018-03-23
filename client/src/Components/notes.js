import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNotes } from '../Actions';
import { Input, Form, ListGroupItem, ListGroup, Button } from 'reactstrap';

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            tags: false,
            addTags: false
        };
    }

    componentDidMount() {
        this.props.getNotes();
    }

    searchChangeHandler = event => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    hoverToggle = () => {
        const active = this.state.tags;
        this.setState({ tags: !active });
    };

    mouseOut = () => {
        this.setState({ tags: false });
    };

    addTags = () => {
        const active = this.state.addTags;
        this.setState({ addTags: !active });
    };

    render() {
        const filter = this.props.notesReceived
            ? this.props.notes.filter(note =>
                  note.title
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase())
              )
            : [{ title: 'test', content: 'test content', _id: '1' }];
        return (
            <div className="Notes">
                <h5>
                    Hello and welcome! This project can be found on{' '}
                    <Button
                        color="info"
                        href="https://github.com/groov1234/lambda-notes"
                    >
                        Github
                    </Button>
                </h5>

                <br />
                <br />
                <Form>
                    <Input
                        placeholder="Search..."
                        name="search"
                        value={this.state.search}
                        onChange={this.searchChangeHandler}
                    />
                </Form>
                <br />
                <br />
                <ListGroup>
                    {filter.map((note, index) => {
                        return (
                            <ListGroupItem
                                key={note._id}
                                className="note"
                                onClick={() => {
                                    this.props.previewNote(
                                        note.title,
                                        note.content,
                                        note._id
                                    );
                                }}
                                onMouseOver={this.hoverToggle}
                                onMouseOut={this.mouseOut}
                            >
                                <div className="note--title">
                                    {note.title.length > 30
                                        ? note.title
                                              .substring(0, 30)
                                              .concat('...')
                                        : note.title}
                                </div>
                                <br />
                                <div className="note--text">
                                    {note.content.length > 70
                                        ? note.content
                                              .substring(0, 70)
                                              .concat('...')
                                        : note.content}
                                </div>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
        notesReceived: state.notesReceived
    };
};

export default connect(mapStateToProps, { getNotes })(Notes);
