import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../styles/css/index.css';

const NotLoggedIn = _ => {
	return (
		<div className="NotLoggedIn">
			<div className="NotLoggedInDescription">Not logged in</div>

			<NavLink to="/" className="ReturnToLogin">
				return to login
			</NavLink>
		</div>
	);
};

export default NotLoggedIn;
