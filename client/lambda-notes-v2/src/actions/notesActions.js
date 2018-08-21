import axios from 'axios';

export const FETCH_CALLED = 'FETCH_CALLED' ;
export const FETCH_RETURNED = 'FETCH_RETURNED' ;
export const SERVER_ERROR = 'SERVER_ERROR' ;


export const getData = () => {
    const promise = axios.get('http://localhost:3333/api/notes');
    return function (dispatch) {
        dispatch({ type:FETCH_CALLED });
        promise
            .then(response => {
                dispatch({ type: FETCH_RETURNED, payload: response.data });
            }).catch(err => {
                dispatch({ type: SERVER_ERROR, payload: ['ERROR-axios:', err] });
            });
    };
};