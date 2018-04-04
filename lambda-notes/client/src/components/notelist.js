import React from 'react';
import Note from './icons/note';
import axios from 'axios';
import { Link } from 'react-router-dom';

class NoteList extends Component {
    constructor() {
        super();
        this.state = {
            oldContent: [],
            content: ''
        }
    }

    contentInput(event) {
        this.setState({ content: event.target.value });
    }

    addContent(event) {
        event.preventDefault();
        const newContent = this.state.oldContent;
        axios.post('http://localhost:5000/create-post', newContent)
        .then((data) => {
            // newContent.push(this.state.content);
            // this.setState({
            //     content: '',
            //     content: newContent
            // });
            //
            localStorage.setItem(newContent, data.data._id);
            setTimeout(() => {
                window.location = '/list'
            }, 200)
        })
        .catch(err => {
            console.log({ 'error': err.response.error });
        });
    }
    
    render() {
        return (
            <Link className='link__second' to='/view'><div className="note__icon">
            <p className="note__icon__title">Test for title</p>
            <hr className="style__one"/>
            <p>Test for snippet of note</p>
        </div></Link>
        );
    }


};

export default NoteList;