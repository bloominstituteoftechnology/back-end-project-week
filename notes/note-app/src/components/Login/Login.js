import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

import { checkLogin, resetError } from '../../actions';

import '../../styles/css/index.css';

class Login extends Component {
	state = {
		username: '',
		password: '',
	};

	componentWillMount() {
		this.checkLocalStorage();
		this.checkPropsForUsername();
	}

	checkLocalStorage = _ => {
		if (Object.keys(localStorage).includes('notes-app-id-1941293123912')) {
			this.setState({
				username: JSON.parse(localStorage.getItem('notes-app-id-1941293123912'))
					.username,
			});
			this.props.checkLogin(
				JSON.parse(localStorage.getItem('notes-app-id-1941293123912')),
			);
		}
	};

	checkPropsForUsername = _ => {
		if (this.props.match.params.username !== undefined) {
			// this.props.checkLogin()
		}
	};

	inputHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	checkLoginHandler = _ => {
		if (this.props.error !== '') this.props.resetError();

		this.props.checkLogin({ ...this.state });

		// if (this.props.loginPassed) this.setState({ username: '', password: '' });
	};

	checkIfEnter = e => {
		if (e.keyCode === 13) {
			this.checkLoginHandler();
		}
	};

	render() {
		return (
			<div className="Login">
				<NavLink to="/signup" className="LoginSignUpButton">
					Sign up
				</NavLink>

				<div className="LoginTitle">Notes&reg;</div>

				{!this.props.isLoggedIn ? (
					<div className="LoginNotLoggedIn">
						<div className="LoginDescription">
							{this.props.isAuthenticating
								? 'Authenticating..'
								: this.props.error === '' ? 'Please log in' : this.props.error}
						</div>

						<form className="LoginLogin">
							<div className="InputFields">
								<input
									className="InputFields__username"
									onChange={this.inputHandler}
									onKeyUp={this.checkIfEnter}
									type="text"
									name="username"
									value={this.state.username}
									placeholder="username"
									disabled={this.props.isAuthenticating}
								/>

								<input
									className="InputFields__password"
									onChange={this.inputHandler}
									onKeyUp={this.checkIfEnter}
									type="password"
									name="password"
									value={this.state.password}
									placeholder="password"
									disabled={this.props.isAuthenticating}
								/>
							</div>

							<div
								className="LoginLoginButton__button"
								onClick={
									this.props.isAuthenticating ? null : this.checkLoginHandler
								}
								style={
									this.props.isAuthenticating
										? {
												background: 'white',
												color: 'black',
												opacity: '0.2',
												fontSize: '0.7rem',
												cursor: 'not-allowed',
											}
										: null
								}
							>
								{this.props.isAuthenticating ? 'Authenticating..' : 'Login'}
							</div>
						</form>
					</div>
				) : (
					<Redirect to={`/notes/${this.state.username}`} />
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticating: state.isAuthenticating,
		isLoggedIn: state.isLoggedIn,
		error: state.error,
	};
};

export default connect(mapStateToProps, {
	checkLogin,
	resetError,
})(Login);
