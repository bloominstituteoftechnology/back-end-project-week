import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import Markdown from 'react-remarkable';

const styles = theme => ({
    note: theme.note,
    title: {
        borderBottom: '2px dotted black',
    },
    hiddenOverflow: {
        overflow: 'hidden'
    }
})

class Note extends Component {
    render() {
        const { classes, id, title, content } = this.props
        return (
            <div className={classes.note} onClick={() => this.props.handleOpenNote(id)}>
                <div className={classes.title}><h4>{title}</h4></div>
                <div className={classes.hiddenOverflow}><Markdown>{content}</Markdown></div>
            </div>
        );
    }
}

export default injectSheet(styles)(Note);
