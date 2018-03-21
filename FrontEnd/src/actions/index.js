import axios from 'axios';
import history from '../helpers/history';
import {
    FETCH_NOTE,
    NOTES_RETRIEVED,
    ADD_NOTE,
    NOTE_ADDED,
    EDIT_NOTE,
    NOTE_EDITED,
    DELETE_NOTE,
    NOTE_DELETED,
    ERROR,
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
} from './types';

const ROOT_URL = 'http://localhost:3000';

export const loginUser = (email, password) => {
    return dispatch => {
        axios.post(`${ROOT_URL}/login`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                history.push('/notes');
            })
            .catch(() => {
                dispatch(authError('This is not a correct login. Please try again.'));
            });
    }
}

export const signupUser = (email, password) => {
    return dispatch => {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                history.push('/notes');
            })
            .catch(response => dispatch(authError(response.data.error)));
    };
};

export const authError = error => {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export const logoutUser = () => {
    localStorage.removeItem('token');
    return { type: UNAUTH_USER };
};

export const getNotes = () => {
    return dispatch => {
        dispatch({ type: FETCH_NOTE });
        axios.get(`/notes`, {
            headers: { Authorization: window.localStorage.getItem("token") }
        })
            .then(response => {
                dispatch({ type: NOTES_RETRIEVED, payload: response.data });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error });
            });
    };
};

export const addNote = note => {
    return dispatch => {
        dispatch({ type: ADD_NOTE });
        axios.post(`/notes`, note, {
            headers: { Authorization: window.localStorage.getItem("token") }
        })
            .then(response => {
                dispatch({ type: NOTE_ADDED, payload: response.data });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error });
            });
    };
};

export const editNote = note => {
    return dispatch => {
        dispatch({ type: EDIT_NOTE });
        axios.put(`/notes`, note, {
            headers: { Authorization: window.localStorage.getItem("token") }
        })
            .then(response => {
                dispatch({ type: NOTE_EDITED, payload: response.data });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error });
            });
    };
};

export const deleteNote = id => {
    return dispatch => {
        dispatch({ type: DELETE_NOTE });
        axios({
            url: `/notes`,
            method: "delete",
            data: { id },
            headers: { Authorization: window.localStorage.getItem("token") }
        })
            .then(response => {
                dispatch({ type: NOTE_DELETED, payload: id });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error });
            });
    };
};