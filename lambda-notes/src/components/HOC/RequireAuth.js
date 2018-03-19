import React, { Component } from 'react';
import { connect } from 'react-redux';
import Users from '../users';

export default function RequireAuth(ChildComponent) {
	class RequireAuthentication extends Component {
		componentWillMount() {
			if (!this.props.authenticated) this.props.history.push('/signin');
		}
		render() {
			return (
				<div>{this.props.authenticated ? <ChildComponent /> : null}</div>
			);
		}
	}
	const mapStateToProps = state => {
		return {
			authenticated: state.auth.authenticated
		};
	};
	return connect(mapStateToProps)(RequireAuthentication);
}

