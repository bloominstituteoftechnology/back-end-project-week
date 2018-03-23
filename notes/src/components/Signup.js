import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/user';

class SignupForm extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: ''
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { firstName, lastName, email, password, confirmPassword } = this.state;
		const { history } = this.props;
		this.props.register({
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			history
		});
	};

	handleInput = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}

	renderAlert = () => {
		if (!this.props.error) return null;
		return <h3>{ this.props.error }</h3>
	}

	render () {
		return (
			<div className='signup-form-input'>
				<h1>Sign Up</h1>
				<form id='signup-form' onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="firstName"
						placeholder="First Name"
						value={this.state.firstName}
						onChange={this.handleInput}
					/>
					<input
						type="text"
						name="lastName"
						placeholder="Last Name"
						value={this.state.lastName}
						onChange={this.handleInput}
					/>
					<input
						type="email"
						name="email"
						placeholder="email"
						value={this.state.email}
						onChange={this.handleInput}
					/>
					<input
						type="password"
						name="password"
						placeholder="password"
						value={this.state.password}
						onChange={this.handleInput}
					/>
					<input
						type="password"
						name="confirmPassword"
						placeholder="confirm password"
						value={this.state.confirmPassword}
						onChange={this.handleInput}
					/>
					<button type="submit">Sign Up</button>
					{this.renderAlert()}
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authenticated: state.auth.authenticated,
		error: state.auth.error
	}
}

export default connect(mapStateToProps, { register })(SignupForm);
