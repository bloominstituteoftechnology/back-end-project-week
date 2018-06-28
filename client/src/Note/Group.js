import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';

import Note from './Note';

class Group extends Component {
    handleNoteDrop = (e) => {
        const { group, notes } = this.props
        this.props.handleNoteDrop(group, notes, e)
    }
    render() {
        const { notes, group, handleOpenNote } = this.props
        let orderedNotes = notes.sort((prev, next) => prev.row - next.row)
        return (
            <Container
                groupName='unpinnedNotes'
                getChildPayload={i => orderedNotes[i]}
                onDrop={(e) => this.handleNoteDrop(e)}>
                {
                    orderedNotes.map(note => {
                        return (
                            <Draggable key={note._id}>
                                <Note {...note} handleOpenNote={handleOpenNote} />
                            </Draggable>
                        );
                    })
                }
            </Container>
        )
    }
}

export default Group;