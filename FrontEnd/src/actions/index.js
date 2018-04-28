import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

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

const ROOT_URL = 'http://localhost:5050';

export const login_user = (email, password) => {
    return dispatch => {
        axios.post(`${ROOT_URL}/login`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                this.props.history.push('/notes');
            })
            .catch(() => {
                dispatch(auth_error('This is not a correct login. Please try again.'));
            });
    };
};

export const signup_user = (email, password) => {
    return dispatch => {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                this.props.history.push('/notes');
            })
            .catch(response => dispatch(auth_error(response.data.error)));
    };
};

export const auth_error = error => {
    return {
        type: AUTH_ERROR,
        payload: error
    };
};

export const logout_user = () => {
    localStorage.removeItem('token');
    return { type: UNAUTH_USER };
};

export const get_notes = () => {
    return dispatch => {
        dispatch({ type: FETCH_NOTE });
        axios.get(`${ROOT_URL}/notes`, {
            headers: { Authorization: window.localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({ type: NOTES_RETRIEVED, payload: response.data });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error });
            });
    };
};

export const add_note = note => {
    return dispatch => {
        dispatch({ type: ADD_NOTE });
        axios.post(`${ROOT_URL}/notes`, note, {
            headers: { Authorization: window.localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({ type: NOTE_ADDED, payload: response.data });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error });
            });
    };
};

export const edit_note = note => {
    return dispatch => {
        dispatch({ type: EDIT_NOTE });
        axios.put(`${ROOT_URL}/notes`, note, {
            headers: { Authorization: window.localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({ type: NOTE_EDITED, payload: response.data });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error });
            });
    };
};

export const delete_note = id => {
    return dispatch => {
        dispatch({ type: DELETE_NOTE });
        axios({
            url: `${ROOT_URL}/notes`,
            method: "delete",
            data: { id },
            headers: { Authorization: window.localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({ type: NOTE_DELETED, payload: id });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error });
            });
    };
};