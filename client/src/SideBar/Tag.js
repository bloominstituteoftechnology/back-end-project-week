import React, { Component } from 'react';
import injectSheet from 'react-jss';

const styles = theme => ({
    tag: theme.tag,
    tagBackgroundColor: {
        backgroundColor: props => props.color
    }
})

class Tag extends Component {
    render() {
        const { classes, name } = this.props
        return (
            <div className={[classes.tag, classes.tagBackgroundColor].join(' ')}>{name}</div>
        )
    }
}

export default injectSheet(styles)(Tag);