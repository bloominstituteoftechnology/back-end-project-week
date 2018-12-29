import axios from 'axios';

export const FETCH_CALLED = 'FETCH_CALLED';
export const FETCH_RETURNED = 'FETCH_RETURNED';
export const SERVER_ERROR = 'SERVER_ERROR';
export const ADD_CALLED = 'ADD_CALLED';
export const ADD_RETURNED = 'ADD_RETURNED';
export const ADD_ETGOHOME = 'ADD_ETGOHOME';
export const EDIT_CALLED = 'EDIT_CALLED';
export const EDIT_RETURNED = 'EDIT_RETURNED';
export const EDIT_ETGOHOME = 'EDIT_ETGOHOME';

export const fetchData = () => {
    const promise = axios.get('http://localhost:3333/api/notes');
    return function(dispatch) {
        dispatch({ type:FETCH_CALLED });
        promise
            .then(response => {
                dispatch({ 
                    type: FETCH_RETURNED, 
                    payload: response.data 
                });
            })
            .catch(err => {
                dispatch({ 
                    type: SERVER_ERROR, 
                    payload: ['ERROR-axios:', err] 
                });
            });
    };
};

export const addData = (newNote) => {
    
    console.log('newNote:',newNote)
    const promise = axios.post('http://localhost:3333/api/notes', newNote);
    return function(dispatch) {
        
        dispatch(
            { 
                type: ADD_CALLED, 
            } 
        )
        promise
            .then(response => {
                dispatch({ 
                    type: ADD_RETURNED,
                    payload: response 
                })                
            })
            .catch(err => {
                dispatch({ 
                    type: SERVER_ERROR, 
                    payload: ['ERROR-axios:', err] 
                })
            })
    }
}


