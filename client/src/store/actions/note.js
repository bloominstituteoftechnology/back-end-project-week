import * as action from './actionTypes';
import axios from 'axios';

// error handlers 
import {
    add,
    delet
} from './error';

const URL = 'http://localhost:8800/api';

const addHandler = data => ({
    type: action.ADD__NOTE,
    data
})
// const editHandler = data => ({
//     type: action.EDIT__NOTE,
//     data
// })
// const deleteHandler = data => ({
//     type: action.DELETE__NOTE,
//     data
// })
const readHandler = note => ({ // read single note
    type: action.READ__NOTE,
    note
})
const getHandler = notes => ({ // get all notes
    type: action.GET__NOTES,
    notes
})

export const addNote = data => {
    return function (dispatch) {
        axios.post(`${URL}/notes/user/1`, data)
            .then(result => {
                dispatch(delet());
                dispatch(addHandler(result.data));
            })
            .catch(error => {
                dispatch(add(error.response.data));
            })
    }
}

export const getNotes = () => {
    return function (dispatch) {
        axios.get(`${URL}/notes`)
            .then(result => {
                dispatch(delet());
                dispatch(getHandler(result.data))
            })
            .catch(error => {
                dispatch(add(error.response.data));
            })
    }
}
export const getANote = (id, user_id) => {
    return function (dispatch) {
        axios.get(`${URL}/notes/${id}/user/${user_id}`)
            .then(result => {
                dispatch(delet());
                dispatch(readHandler(result.data))
            })
            .catch(error => {
                dispatch(add(error.response.data));
            })
    }
}