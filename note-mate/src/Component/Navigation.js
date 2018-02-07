import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loggedOut } from '../Actions';


class Navigation extends Component {
    logOut = (event) => {
        event.preventDefault();
        this.props.loggedOut();
    }

    render() {
        return (
            <div>
                <h3>
                    Note Mate
                </h3>
                <div onClick={this.logOut} >
                    Log Out
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps, { loggedOut }) (Navigation);