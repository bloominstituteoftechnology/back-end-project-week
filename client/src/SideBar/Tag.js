import React, { Component } from 'react';

class Tag extends Component {
    render() {
        const { tag } = this.props
        return (
            <div>{tag}</div>
        )
    }
}

export default Tag;