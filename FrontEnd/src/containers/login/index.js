import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/index';

class LoginNav extends Component {

    constructor() {
        super();
    };

    loginUser() {
        const email = this.refs.email && this.refs.email.value;
        const password = this.refs.password && this.refs.password.value;
        this.props.dispatch(
            actions.loginUser(email, password)
        );
    };

    logout() {
        this.props.dispatch(
            actions.logoutUser()
        );
    };

    render() {
        const user = this.props.user;

        return (
            <ul className="nav navbar-nav navbar-right">
                <li className="nav-button">
                    {
                        (!user || !user.email || !user.hasPassword)
                        &&
                        <span>
                            LOG IN &#10161;
                            {
                                (!user || !user.email)
                                &&
                                <input className="nav-input" ref="email" placeholder="email" type="text" />
                            }
                            {
                                (!user || !user.hasPassword)
                                &&
                                <input className="nav-input" ref="password" placeholder="password" type="password" />
                            }
                            {
                                (!user || !user.hasPassword)
                                &&
                                <button className="local-auth-button" onClick={this.handleLocalAuth.bind(this)}>Note Authorization</button>
                            }
                        </span>
                    }
                    {
                        user
                        &&
                        <a className="nav-button log-out-button show" href="#" onClick={this.logout.bind(this)}>
                            LOG OUT
            </a>
                    }
                </li>
            </ul>
        );
    };
};

mapStateToProps = store => {
    return {
        user: store.user,
    };
};

LoginNav.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        hasPassword: PropTypes.bool.isRequired,
    }),
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(LoginNav);
