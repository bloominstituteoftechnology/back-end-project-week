import axios from 'axios';
axios.defaults.withCredentials = true;
const ROOT_URL = 'http://localhost:5000';

export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

export const NOTE_ERROR = 'NOTE_ERROR';
export const GET_NOTES = 'GET_NOTES';
export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_SELECTED = 'UPDATE_SELECTED';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';

// USER ACTIONS
export const authError = error => {
    return {
        type: AUTHENTICATION_ERROR,
        payload: error,
    };
};

export const register = (username, password, confirmPassword, history) => {
    return dispatch => {
        if (password !== confirmPassword) {
            dispatch(authError('Passwords do not mtach'));
            return;
        }
        axios
            .post(`${ROOT_URL}/signup`, { username, password })
            .then(() => {
                dispatch({ type: USER_REGISTERED });
                history.push('/login');
            })
            .catch(() => {
                dispatch(authError('Failed to register user'));
            });
    };
};

export const login = (username, password, history) => {
    return dispatch => {
        axios
            .post(`${ROOT_URL}/login`, { username, password })
            .then(result => {
                dispatch({ type: USER_AUTHENTICATED, payload: username });
                localStorage.setItem('token', result.data.token);
                history.push('/home');
            })
            .catch(() => {
                dispatch(authError('Incorrect username or password'));
            });
    };
};

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('token');
        dispatch({ type: USER_UNAUTHENTICATED });
    };
};

// NOTE ACTIONS
export const noteError = error => {
    return {
        type: NOTE_ERROR,
        payload: error,
    };
};

export const getNotes = user => {
    const token = localStorage.getItem('token');
    return dispatch => {
        axios
            .post(
                `${ROOT_URL}/home`,
                { user },
                { headers: { authorization: token } }
            )
            .then(response => {
                dispatch({
                    type: GET_NOTES,
                    payload: response.data,
                });
            })
            .catch(() => {
                dispatch(noteError('Failed to fetch notes'));
            });
    };
};

export const addNote = noteObj => {
    const token = localStorage.getItem('token');
    const { title, text, user } = noteObj;
    return dispatch => {
        axios
            .post(
                `${ROOT_URL}/create`,
                { title, text, user },
                { headers: { authorization: token } }
            )
            .then(response => {
                dispatch({ type: ADD_NOTE, payload: response.data });
            })
            .catch(error => {
                dispatch(noteError('Failed to add note'));
            });
    };
};

export const updateSelected = id => {
    return {
        type: UPDATE_SELECTED,
        payload: id,
    };
};

export const deleteNote = id => {
    const token = localStorage.getItem('token');
    return dispatch => {
        axios
            .delete(
                `${ROOT_URL}/note/${id}`,
                { headers: { authorization: token } }
            )
            .then(response =>
                dispatch({
                    type: DELETE_NOTE,
                    payload: id
                })
            )
            .catch(() => {
                dispatch(noteError('Failed to delete note'));
            });
    };
};

export const editNote = noteObj => {
    const token = localStorage.getItem('token');
    const { title, text, id } = noteObj;
    return dispatch => {
        axios
            .put(
                `${ROOT_URL}/edit/:id`,
                { title, text, id },
                { headers: { authorization: token } }
            )
            .then(response => {
                dispatch({ type: EDIT_NOTE, payload: response.data });
            })
            .catch(() => {
                dispatch(noteError('Failed to edit note'));
            });
    };
};
