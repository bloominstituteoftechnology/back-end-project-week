import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

class NoteList extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        // axios.get('https://localhost/5000/posts')
            .then((res) => {
                console.log(res.data);
                this.setState({ posts: res.data });
            })
            .catch((err) => {
                console.log('You still need your posts. Try again.')
            })
    }

    render() {
        return (
            <div>
                {this.state.posts.map((post) => {
                    return (
                        <div key={post._id} className="note__icon">
                            <p className="note__icon__title">{post.title}</p>
                            <hr className="style__one" />
                            <p>{post.body}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
};

export default NoteList;