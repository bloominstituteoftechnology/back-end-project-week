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
            <div className='Navigation'>
                <div className='Navigation--Brand'>
                    Note Mate
                </div>
                <div onClick={this.logOut} className='Navigation--LogOut'>
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