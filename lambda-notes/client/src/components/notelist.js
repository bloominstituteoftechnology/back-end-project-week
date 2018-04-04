import React, { Component } from 'react';
import Note from './icons/note';
import axios from 'axios';
import { Link } from 'react-router-dom';

class NoteList extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            content: ''
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContent = this.handleContent.bind(this);
        this.submitPost = this.submitPost.bind(this);
    }

    contentInput(event) {
        this.setState({ content: event.target.value });
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }
    handleContent(event) {
        this.setState({ content: event.target.value });
    }
    submitPost(event) {
        event.preventDefault();
        const { title, content } = this.state;
        const newPost = { title, content, author: localStorage.getItem('uuID') };
        this.setState({ content: '', title: '' });
        axios.post('http://localhost:5000/create-post', newPost)
            .then((data) => {
                const newPostId = data.data._id;
                window.location = `/posts/${newPostId}`
            })
            .catch((err) => {
                console.log('You still need to get your posts.', err);
            })
    }

    render() {
        return (
            <Link className='link__second' to='/view'><div className="note__icon">
                <p  onChange={this.handleTitleChange}  className="note__icon__title">{this.state.title}</p>
                <hr className="style__one" />
                <p  onChange={this.handleContent}>{this.state.content}</p>
            </div></Link>
        );
    }


};

export default NoteList;