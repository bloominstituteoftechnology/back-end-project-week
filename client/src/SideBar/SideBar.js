import React, { Component } from 'react';
import posed from 'react-pose';
import db from '../dummyData.js';
import { Container, Draggable } from 'react-smooth-dnd';
import Tag from './Tag';
import injectSheet from 'react-jss';
import NewTag from './NewTag';

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

const Tags = ({ tags }) =>
    <div>
        <h3>Tags</h3>
        <Container
            groupName='tags'
            getChildPayload={i => tags[i]}
        >
            {
                tags.map(tag =>
                    <Draggable key={tag.id}>
                        <Tag {...tag} />
                    </Draggable>
                )
            }
        </Container>
        <NewTag />
    </div>

const Account = () =>
    <div>
        <h3>Account</h3>

    </div>


export default injectSheet(styles)(SideBar);