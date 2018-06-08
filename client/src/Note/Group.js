import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';

import Note from './Note';

class Group extends Component {
    handleDrop = (e) => {
        const { group, notes } = this.props
        this.props.handleDrop(group, notes, e)
    }
    render() {
        const { notes, group } = this.props
        let orderedNotes = notes.sort((prev, next) => prev.row - next.row)
        return (
            <Container
                groupName='unpinnedNotes'
                getChildPayload={i => orderedNotes[i]}
                onDrop={(e) => this.handleDrop(e)}>
                {
                    orderedNotes.map(note => {
                        return (
                            <Draggable key={note.id}>
                                <Note {...note} />
                            </Draggable>
                        );
                    })
                }
            </Container>
        )
    }
}

export default Group;