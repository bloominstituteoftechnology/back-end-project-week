import React, { Component } from 'react';
import './register.css';
import AuthService from './auth';
import { Link } from 'react-router-dom';

class Register extends Component {
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.Auth = new AuthService();
	}

	// componentWillMount() {
	// 	if (this.Auth.isRegistered()) {
	// 		this.props.history.push('/login')
	// 	}
	// }

	render() {
		return (
			<div className="center">
				<div className="card">
					<h1>Register</h1>
					<form>
						<input 
							className="form-item"
							placeholder="Username goes here..."
							name="username"
							type="text"
							onChange={this.handleChange}
						/>
						<input 
							className="form-item"
							placeholder="Password goes here..."
							name="password"
							type="password"
							onChange={this.handleChange}
						/>
						<input 
							className="form-submit"
							value="SUBMIT"
							type="submit"
							onClick={this.handleFormSubmit}
						/>
					</form>
					<p>Already have an account? Log in <Link to="/login">here</Link>.</p>
				</div>
			</div>
		);
	}

	handleChange(event) {
		this.setState(
			{
				[event.target.name]: event.target.value
			}
		)
	} 

	handleFormSubmit(event) {
		event.preventDefault();

		this.Auth.register(this.state.username, this.state.password)
			.then(() => {
				this.props.history.push('/login')
			}) 
			.catch(err => {
				alert(err)
			})
	}
}

export default Register;