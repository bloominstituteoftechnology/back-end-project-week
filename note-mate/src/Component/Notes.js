import React, { Component } from 'react';
import {connect} from 'react-redux';

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
    }

    searchChangeHandler = event => {
        event.preventDefault();
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        const filter = this.props.notes.filter(note => note.Title.toLowerCase().includes(this.state.search.toLowerCase()));
        return (
            <div className='Notes'>
            <div className="Notes--Search">
                <input placeholder="Search..." name='search' value={this.state.search} onChange={this.searchChangeHandler} />
            </div>
            <ul>
                {filter.map((note, index) => {
                return <li className='note' onClick={() => {this.props.previewNote(note.Title, note.Text, note.ID)}} key={note.ID}>
                    <div className="note--title">
                    {note.Title.length > 30 ? note.Title.substring(0,30).concat('...'): note.Title}
                    </div>
                    <br/>
                    {note.Text.length > 100 ? note.Text.substring(0,100).concat('...') : note.Text}
                </li>
                })}
            </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes
    }
}

export default connect(mapStateToProps) (Notes);