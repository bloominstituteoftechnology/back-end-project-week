import React from 'react';
import { NavLink } from 'react-router-dom';

const StatusBar = props => {
	return (
		<div className="StatusBar">
			<NavLink to="/" className="StatusBar__goToHomeButton">
				&#x2302;
			</NavLink>

			<div className="StatusBar__signOutButton" onClick={props.signOutHandler}>
				{!props.appIsLoggedIn ? 'Sign In' : 'Sign out'}
			</div>
		</div>
	);
};

export default StatusBar;
