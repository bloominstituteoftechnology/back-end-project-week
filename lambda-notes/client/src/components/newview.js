import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

class NewView extends Component {

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
                window.location = `/list/${newPostId}`
            })
            .catch((err) => {
                console.log('You still need to get your posts.', err);
            })
    }


    render() {
        return (
            <div>
                <div className="section__content__left">
                <h1 className="title"><Link to='/' className="title__link">Lambda Notes</Link></h1>
                    <button className="button__main"><Link className="link" to='/list'>View Your Notes</Link></button>
                    <br />
                   <button className="button__main"><Link className="link" to='/create'>+ Create New Note</Link></button>

                </div>
                <div className="main">
                    <div className="main__list">
                        <h3 className="title__main">Create Note:</h3>
                        <input className="note__input__title"  onChange={this.handleTitleChange} value={this.state.title} placeholder="Note Title"></input>
                        <textarea className="note__input__content" onChange={this.handleContent} value={this.state.content} placeholder="Note Content"></textarea>
                        <br />
                        <button className="button__main__update" onClick={this.submitPost}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewView;