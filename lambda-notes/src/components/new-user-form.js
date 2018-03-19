import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewUserForm extends Component {
	render() {
		return (
			<div className="NewUserForm">
				<form>
					<input type="text" placeholder="First Name" />
					<input type="text" placeholder="Last Name" />
					<input type="text" placeholder="Email" />
					<input type="text" placeholder="Password" />
					<input type="text" placeholder="Re-enter password" />
				</form>
				<Link to="/">
					<input type="submit" value="Create Account" />
				</Link>
			</div>
		);
	};
}

export default NewUserForm;