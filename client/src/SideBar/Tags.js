import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Container, Draggable } from 'react-smooth-dnd';
import NewTag from './NewTag';
import Tag from './Tag';

const styles = theme => ({
})

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

export default injectSheet(styles)(Tags);