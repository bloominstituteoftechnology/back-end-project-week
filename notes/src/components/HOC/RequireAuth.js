import React, { Component } from 'react';
import { connect } from 'react-redux';


export default function RequireAuth(ChildComponent) {
	class RequireAuthentication extends Component {
		componentWillMount() {
			if (!localStorage.getItem('authorization')) {
				this.props.history.push('/login');
			}
		}

		render() {
			const foundToken = localStorage.getItem('authorization');
			if (foundToken) {
				return (
					<ChildComponent />
				);
			}
			return null;
		}
	}

	const mapStateToProps = state => {
		return {
			authenticated: state.auth.authenticated
		}
	}

	return connect(mapStateToProps)(RequireAuthentication);
};
