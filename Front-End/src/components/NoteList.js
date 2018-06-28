import React from 'react';
import { Card, Icon } from 'semantic-ui-react'

const NoteList = (props) => {
    return (
        <div>
            {props.notes.map(e => {
                return (<Card
                    header={e.title}
                    // meta='Friend'
                    description={e.body}
                />
                );
            })}
        </div>
    );
};

export default NoteList;