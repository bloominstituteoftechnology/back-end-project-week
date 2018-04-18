import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/user';

class LoginForm extends Component {
	state = {
		email: '',
		password: ''
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { email, password } = this.state;
		const { history } = this.props;
		console.log('this.props', this.props);
		this.props.login({ email, password, history });
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
			<div className='login-form-input'>
				<h1>Log In</h1>
				<form id='login-form' onSubmit={this.handleSubmit}>
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
					<button type="submit">Login</button>
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

export default connect(mapStateToProps, { login })(LoginForm);
