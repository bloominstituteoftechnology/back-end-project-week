import {
    ADD__ERROR,
    DELETE__ERROR
} from './actionTypes';

export const add = error => ({
    type: ADD__ERROR,
    error
})
export const delet = data => ({
    type: DELETE__ERROR,
    data
})