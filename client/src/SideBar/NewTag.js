import React, { Component } from 'react';
import injectSheet from 'react-jss';

const styles = theme => ({
    tag: theme.tag,
    inputTag: theme.inputTag,
    tagBackgroundColor: {
        backgroundColor: 'white'
    }
})

class NewTag extends Component {
    state = {
        tag: ''
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleEnter = (e) => {
        if (e.key === 'Enter') {
            //to-do: add new tag to tags db and update tags list in SideBar
        }
    }
    render() {
        const { classes } = this.props
        const { tag } = this.state
        return (
            <div className={[classes.tag, classes.tagBackgroundColor].join(' ')}>
                <input className={classes.inputTag} name='tag' value={tag} onChange={this.handleChange} placeholder='New tag ...' onKeyPress={this.handleEnter} />
            </div>
        )
    }
}

export default injectSheet(styles)(NewTag);