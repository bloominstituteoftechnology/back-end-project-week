import axios from 'axios';

export const GET_NOTES = 'GET_NOTES';
export const GOT_NOTES = 'GOT_NOTES';
export const GET_SPECIFIC_NOTE = 'GET_SPECIFIC_NOTE';
export const MAKE_NOTE = 'MAKE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const ERROR = 'ERROR';

export const getNotes = () => {
    const promise = axios.get('https://localhost:8888/notes');
    return dispatch => {
        dispatch({ type: GET_NOTES });
        promise
        .then(response => {
        console.log(response);
        dispatch({type: GOT_NOTES, payload: response.data })
        })
        .catch(err => {
        dispatch({ type: ERROR, payload: err })
        })
    }
}

export const addingNote = (postNote) => {
    const promise = axios.post('http://localhost:8888/notes', postNote);
    return dispatch => {
        dispatch({ type: GET_NOTES });
        promise
        .then(response => {
            console.log("POSTing note:", response.data);
        const promise = axios.get('http://localhost:8888/notes');
            dispatch({ type: GET_NOTES });
            promise
            .then(response => {
                console.log('response data: ', response.data)
                dispatch({ type: GOT_NOTES, payload: response.data })
            })
            .catch(err => {
                dispatch({ type: ERROR, payload: err });
            })
        })
    }
}

export const makeNote = (data) => {
    return {
        type: MAKE_NOTE,
        payload: data
    }
}

export const editNote = (data) => {
    return {
        type: EDIT_NOTE,
        payload: data
    }
}

export const deleteNote = (id) => {
    return {
        type: DELETE_NOTE,
        payload: id
    }
}