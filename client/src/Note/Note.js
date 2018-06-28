import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import Markdown from 'react-remarkable';
import { Container, Draggable } from 'react-smooth-dnd';

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
    handleTagDrop = (e, tag) => {
        //to-do: add tag id to the target note's tags in db

    }
    render() {
        const { classes, _id, title, tags, content, handleOpenNote } = this.props
        return (

            <div className={classes.note} onClick={() => handleOpenNote(_id)}>
                <div className={classes.title}><h4>{title}</h4></div>
                <div className={classes.hiddenOverflow}><Markdown>{content}</Markdown></div>
                <Container
                    groupName='tags'
                    getChildPayload={i => tags[i]}
                    onDrop={(e, tag) => this.handleTagDrop(e, tag)}
                >
                    {
                        tags.map(tag =>
                            <Draggable key={tag}>
                                {tag}
                            </Draggable>
                        )
                    }
                </Container>
            </div>

        );
    }
}

export default injectSheet(styles)(Note);
