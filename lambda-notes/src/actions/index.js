import axios from 'axios';
axios.defaults.withCredentials = true;

export const ADD_NOTE = 'ADD_NOTE';
export const ADDING_NOTE = 'ADDING_NOTE';

export const DELETE_NOTE = 'DELETE_NOTE';
export const DELETING_NOTE = 'DELETING_NOTE';

export const UPDATE_NOTE = 'UPDATE_NOTE';
export const UPDATING_NOTE = 'UPDATING_NOTE';

export const FETCHING_NOTES = 'FETCHING_NOTES';
export const FETCH_NOTES = 'FETCH_NOTES';

export const NOTE = 'NOTE';
export const ERROR = 'ERROR';

export const TOGGLE_UPDATE_NOTE = 'TOGGLE_UPDATE_NOTE';

export const USER_REGISTERED = 'USER_REGISTERED';

export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';

export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED'; 

const URL = 'http://localhost:5000/notes'; // you may have to go back into your auth folder to define a route for notes

export const authError = error => {
	return {
		type: AUTHENTICATION_ERROR,
		payload: error
	};
};

export const register = (email, password, confirmPassowrd, history) => {
	return dispatch => {
		if (password !== confirmPassowrd) {
			dispatch(authError('Passwords do not match'));
			return;
		}
		axios
			.post(`${URL}/users`, { email, password })
			.then(response => {
				window.localStorage.setItem('token', response.data.token);
				dispatch({
					type: USER_REGISTERED
				});
				history.push('/signin');
			})
			.catch(() => {
				dispatch(authError('Failed to register user'));
			});
	}
}

export const login = (email, password, history) => {
	return dispatch => {
		axios
			.post(`${URL}/login`, { email, password })
			.then(response => {
				window.localStorage.setItem('token', response.data.token)
				dispatch({
					type: USER_AUTHENTICATED
				});
				history.push('/users');
			})
			.catch(() => {
				dispatch(authError('Incorrect email/passowrd combination'));
			})
	}
}

export const logout = history => {
	return dispatch => {
		dispatch({
			type: USER_AUTHENTICATED
		});
		window.localStorage.removeItem('token');
	};
};

export const addNote = note => {
	const newNote = axios.post(`${URL}/create`, note);
	return dispatch => {
		dispatch({type: ADDING_NOTE});
		newNote
			.then(({ data }) => {
				dispatch({ type: ADD_NOTE, payload: data });
			})
			.catch(err => {
				dispatch({ type: ERROR, payload: err });
			});
	};
};

export const deleteNote = id => {
	const deletedNote = axios.delete(`${URL}/delete`, {data: { id }});
	return dispatch => {
		dispatch({ type: DELETING_NOTE });
		deletedNote
			.then(({ data }) => {
				dispatch({ type: DELETE_NOTE, payload: data });
				dispatch({ type: NOTE, pay: {} });
			})
			.catch(err => {
				dispatch({ type: ERROR, payload: err });
			});
	};
};

export const updateNote = note => {
	return {
		type: NOTE,
		payload: note
	};
};

export const fetchNotes = () => {
	const notes = axios.get(`${URL}/get`);
	return dispatch => {
		dispatch({ type: FETCHING_NOTES });
		notes.then(response => {
			dispatch({ type: FETCH_NOTES, payload: response.data });
		})
		.catch(err => {
			dispatch({ type: ERROR, payload: err });
		});
	};
};

export const toggleShowUpdate = () => {
	return {
		type: TOGGLE_UPDATE_NOTE
	};
};