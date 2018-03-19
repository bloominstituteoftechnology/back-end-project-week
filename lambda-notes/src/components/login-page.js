import React, { Component } from 'react';
import NewUserForm from './new-user-form';
import Notes from './notes';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
	render() {
		return (
			<div className="login">
				<form>
					<input type="text" placeholder="Username" />
					<input type="text" placeholder="Password" />
				</form>
				<Link to="/notes">
					<input type="submit" value="Log In" />
				</Link>
				<p>First time visitor? Create an account <Link to="/newUserForm">here</Link>.</p>
			</div>
		)
	}
}

export default LoginPage;