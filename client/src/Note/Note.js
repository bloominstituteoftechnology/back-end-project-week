import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';

const styles = theme => ({
    note: theme.note,
    title: {
        borderBottom: '2px dotted black',
        marginBottom: theme.spacing * 2
    }
})

class Note extends Component {
    render() {
        const { classes, title, content } = this.props
        return (
            <div className={classes.note}>
                <div className={classes.title}><h4>{title}</h4></div>
                <div>{content}</div>
            </div>
        );
    }
}

export default injectSheet(styles)(Note);
