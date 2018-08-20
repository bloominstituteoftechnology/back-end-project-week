import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { editingNote } from '../../actions';

class EditNote extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            content: '',
         }
    }

    componentDidMount() {
        
        this.setState({
            title: this.props.note.title,
            content: this.props.note.content
        })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value})
    }

    handleSave = e => {
        e.preventDefault();
        const newObj = {
            id: this.props.match.params.id,
            title: this.state.title,
            content: this.state.content
        }
        this.props.editingNote(newObj)
        this.props.history.push('/');
    }

    render() { 
        console.log('edit response: ', this.props)
        return ( 
            <div className='mainAreawrapper'>
                <h3 className='headings mainAreaHeading editNote'>Edit Note:</h3>

                <div className='formCreate'>
                    <input className='inputField inputTitle' placeholder='Note Title' name='title' value={this.state.title} type='text' onChange={this.handleChange} />
                    <textarea className='inputField inputText' placeholder='Note Content' name='content' value={this.state.content} type='text' onChange={this.handleChange} />
                    <button className='saveButton' onClick={this.handleSave}>Update</button>
                </div>
            </div>
         );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log( 'state in single note view: ', state);
    const id = ownProps.match.params.id
    console.log('note in single: ', state.notes)
    return {
        
        note: state.notes.find(note=>{
            return note.id == id
        })
    }
}

export default connect(mapStateToProps, {editingNote}) (EditNote);