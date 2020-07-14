import * as action from './actionTypes';
import axios from 'axios';

// error handlers 
import {
    add,
    delet
} from './error';

const URL = 'http://localhost:8800/api';

const addHandler = notes => ({
    type: action.ADD__NOTE,
    notes
})
// const editHandler = data => ({
//     type: action.EDIT__NOTE,
//     data
// })
const deleteHandler = id => ({
    type: action.DELETE__NOTE,
    id
})
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
                console.log(result)
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
export const deleteNote = (id, user_id) => {
    return function (dispatch) {
        axios.delete(`${URL}/notes/${id}/user/${user_id}`)
            .then(result => {
                dispatch(delet());
                dispatch(deleteHandler(id))
            })
            .catch(error => {
                dispatch(add(error.response.data));
            })
    }
}