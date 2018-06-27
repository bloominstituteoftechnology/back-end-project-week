import React, { Component } from 'react';
import posed from 'react-pose';
import db from '../dummyData.js';
import injectSheet from 'react-jss';
import NewTag from './NewTag';
import Tags from './Tags';
import Account from './Account';

const styles = theme => ({
    sideBar: theme.sideBar
})

const PosedSlideSideBar = posed.div({
    open: {
        width: '23vw',
        opacity: 1,
        flip: true
    },
    close: {
        width: 0,
        opacity: 0,
        flip: true
    }
})

class SideBar extends Component {
    state = {
        isVisible: false,
        tags: []
    }
    componentDidMount = () => {
        // to-do: get tag lists from db
        this.setState({ isVisible: true, tags: db.data.tags })
    }
    render() {
        const { isVisible, tags } = this.state
        const { classes, componentName } = this.props
        let content;
        if (componentName === 'tags') {
            content = <Tags tags={tags} />
        } else if (componentName === 'account') {
            content = <Account />
        } else {
            content = ''
        }
        return (
            <PosedSlideSideBar
                className={classes.sideBar}
                pose={isVisible ? 'open' : 'close'}
            >
                {content}
            </PosedSlideSideBar>
        )
    }
}

export default injectSheet(styles)(SideBar);