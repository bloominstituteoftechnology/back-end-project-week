import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Notes from './Notes';

class LandingPage extends Component {
	render() {
		const { match } = this.props;
		return (
			<div className="landing-page">
				<div className="main-text">
					<h1>Welcome to Note-Mate</h1>
					<h2>Post and keep track of your notes anytime!</h2>
				</div>
				<ul className="landing-page__menu">
					<li className="navLink">
						<NavLink to="login">
							Login
						</NavLink>
					</li>
					<li className="navLink">
						<NavLink to="signup">
							Signup
						</NavLink>
					</li>
				</ul>
			</div>
		);
	}
}

export default LandingPage;
