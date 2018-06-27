import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import Markdown from 'react-remarkable';
import db from '../dummyData.js';

import posed from 'react-pose';

const notes = db.data.notes

const styles = theme => ({
    noteWrapper: theme.selectedNoteWrapper,
    note: theme.selectedNote,
    title: {
        ...theme.typography.h4,
        ...theme.noteInput,
        borderBottom: '2px dotted black',
    },
    content: {
        ...theme.textarea,
        flexGrow: 1,
    }
})

const PosedSelectedNote = posed.div({
    fullscreen: {
        width: '100%',
        height: '100%',
        transition: {
            ease: 'anticipate'
        },
        flip: true
    },
    thumbnail: {
        width: 0,
        height: 0,
        flip: true
    }
})

class NewNote extends Component {
    state = {
        title: '',
        content: '',
        isVisible: false
    }
    componentDidMount = () => {
        this.setState({
            isVisible: true
        })
    }
    handleSaveNote = (e) => {
        if (e.target === e.currentTarget) {
            this.setState({ title: '', content: '', isVisible: false })
            console.log('here')
            this.props.handleSaveNote()
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { classes } = this.props
        const { title, content, isVisible } = this.state
        return (
            <PosedSelectedNote
                className={classes.noteWrapper}
                pose={isVisible ? 'fullscreen' : 'thumbnail'}
                onClick={this.handleSaveNote}
            >
                <div className={classes.note}>
                    <input className={classes.title} type='text' name='title' placeholder='Give it a title' value={title} onChange={(e) => this.handleChange(e)} />
                    <textarea className={classes.content} type='text' name='content' placeholder='What is your plan?' value={content} onChange={(e) => this.handleChange(e)} />
                </div>
            </PosedSelectedNote >
        );
    }
}

export default injectSheet(styles)(NewNote);
