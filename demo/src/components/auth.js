var decode =require('jwt-decode');

export default class AuthService {
	constructor(domain) {
		this.domain = domain || 'http://localhost:8080'
		this.fetch = this.fetch.bind(this)
		this.login = this.login.bind(this)
		this.getProfile = this.getProfile.bind(this)
		this.registered = false;
	}

	register(username, password) {
		return this.fetch(`${this.domain}/register`, {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		}).then(res => {
			this.registered = true;
			return Promise.resolve(res);
		})
	}

	login(username, password) {
		return this.fetch(`${this.domain}/login`, {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		}).then(res => {
			// localStorage.setItem('user_id', res.user._id);
			localStorage.setItem('user_id', decode(res.token)._id);
			this.setToken(res.token)
			return Promise.resolve(res);
		})
	}

	addNote(title, body) {
		return this.fetch(`${this.domain}/notes`, {
			method: 'POST',
			body: JSON.stringify({
				title,
				body
			})
		}).then(res => {
			return Promise.resolve(res);
		})
	}

	isRegistered() {
		return this.registered
	}

	loggedIn() {
		const token = this.getToken()
		return !!token && !this.isTokenExpired(token)
	}

	getNotes() {
		// const username = decode(this.getToken()).username;
		return this.fetch(`${this.domain}/notes`, {
			method: 'GET'
		}).then(res => {
			return Promise.resolve(res);
		})
	}

	isTokenExpired(token) {
		try {
			const decoded = decode(token);
			if (decoded.exp < Date.now() / 1000) {
				return true;
			} else {
				return false;
			}
		}
		catch (err) {
			return false;
		}
	}

	setToken(idToken) {
		localStorage.setItem('id_token', idToken)
	}

	getToken() {
		return localStorage.getItem('id_token');
	}

	logout() {
		return this.fetch(`${this.domain}/logout`, {
			method: 'POST'
		}).then(res => {
			localStorage.removeItem('id_token');
			return Promise.resolve(res);
		})
	}

	getProfile() {
		return decode(this.getToken());
	}

	fetch(url, options) {
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}

		if (this.loggedIn()) {
			headers['Authorization'] = 'Bearer' + this.getToken()
		}

		return fetch(url, {
			headers,
			...options
		})
			.then(this._checkStatus)
			.then(response => response.json())
	}

	_checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response
		} else {
			var error = new Error(response.statusText)
			error.response = response
			throw error
		}
	}
}