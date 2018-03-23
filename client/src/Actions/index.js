import axios from 'axios';

export const GETTINGNOTES = 'GETTINGNOTES';
export const NOTESRECEIVED = 'NOTESRECEIVED';

export const ADDINGNOTE = 'ADDINGNOTE';
export const NOTEADDED = 'NOTEADDED';

export const UPDATINGNOTE = 'UPDATINGNOTE';
export const NOTEUPDATED = 'NOTEUPDATED';

export const DELETINGNOTE = 'DELETINGNOTE';
export const NOTEDELETED = 'NOTEDELETED';

export const LOGGINGIN = 'LOGGINGIN';
export const LOGGEDIN = 'LOGGEDIN';

export const LOGGEDOUT = 'LOGGEDOUT';

export const SIGNNINGUP = 'SIGNNINGUP';
export const SIGNEDUP = 'SIGNEDUP';

export const ERROR = 'ERROR';

export const persistLogIn = () => {
    return dispatch => {
        dispatch({ type: LOGGEDIN });
    };
};

export const loggedIn = (email, password) => {
    return dispatch => {
        dispatch({ type: LOGGINGIN });
        axios
            .post(`/login`, { email, password })
            .then(response => {
                window.localStorage.setItem('token', response.data.token);
                dispatch({ type: LOGGEDIN, payload: response });
            })
            .catch(err => {
                dispatch({ type: ERROR, payload: err });
            });
    };
};

export const loggedOut = () => {
    return dispatch => {
        window.localStorage.removeItem('token');
        dispatch({ type: LOGGEDOUT });
        window.location.reload();
    };
};

export const signUp = (email, password) => {
    return dispatch => {
        dispatch({ type: SIGNNINGUP });
        axios
            .post(`/signup`, { email, password })
            .then(response => {
                window.localStorage.setItem('token', response.data.token);
                dispatch({ type: LOGGEDIN, payload: response });
            })
            .catch(err => {
                dispatch({ type: ERROR, payload: err });
            });
    };
};

export const getNotes = () => {
    return dispatch => {
        dispatch({ type: GETTINGNOTES });
        axios
            .get(`/notes`, {
                headers: { Authorization: window.localStorage.getItem('token') }
            })
            .then(response => {
                dispatch({ type: NOTESRECEIVED, payload: response.data });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error });
            });
    };
};

export const addNote = note => {
    return dispatch => {
        dispatch({ type: ADDINGNOTE });
        axios
            .post(`/notes`, note, {
                headers: { Authorization: window.localStorage.getItem('token') }
            })
            .then(response => {
                dispatch({ type: NOTEADDED, payload: response.data });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error });
            });
    };
};

export const updateNote = note => {
    return dispatch => {
        dispatch({ type: UPDATINGNOTE });
        axios
            .put(`/notes`, note, {
                headers: { Authorization: window.localStorage.getItem('token') }
            })
            .then(response => {
                dispatch({ type: NOTEUPDATED, payload: response.data });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error });
            });
    };
};

export const deleteNote = id => {
    return dispatch => {
        dispatch({ type: DELETINGNOTE });
        axios({
            url: `/notes`,
            method: 'delete',
            data: { id },
            headers: { Authorization: window.localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({ type: NOTEDELETED, payload: id });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error });
            });
    };
};
