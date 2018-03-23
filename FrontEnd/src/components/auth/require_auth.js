import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function (Component) {
    class Auth extends React.Component {
        static contextTypes = {
            router: PropTypes.object
        };

        componentWillMount() {
            if (!this.props.authenticated) {
                this.context.router.push('/notes');
            };
        };

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.context.router.push('/notes');
            };
        };

        render() {
            return <Component {...this.props} />
        };
    };

    const mapStateToProps = state => {
        return { authenticated: state.auth.authenticated };
    };

    return connect(mapStateToProps)(Auth);
}