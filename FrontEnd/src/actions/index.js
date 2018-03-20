import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    ADD_NOTE,
    EDIT_NOTE,
    DELETE_NOTE,
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE,

} from './types';

const ROOT_URL = 'http://localhost:3000';

export function loginUser({ email, password }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/login`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/notes');
            })
            .catch(() => {
                dispatch(authError('This is not a correct login. Please try again.'));
            });
    }
}

export function signupUser({ email, password }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/notes');
            })
            .catch(response => dispatch(authError(response.data.error)));
    };
};

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function logoutUser() {
    localStorage.removeItem('token');
    return { type: UNAUTH_USER };
};

export function fetchMessage() {
    return function (dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                });
            });
    };
};

export const addNote = note => {
    return {
        type: ADD_NOTE,
        payload: note
    };
};

export const editNote = note => {
    return {
        type: EDIT_NOTE,
        payload: note
    }
}

export const deleteNote = id => {
    return {
        type: DELETE_NOTE,
        payload: id
    }
}