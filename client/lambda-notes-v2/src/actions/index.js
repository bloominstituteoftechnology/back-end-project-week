import axios from 'axios';
import history from '../components/history';

export const FETCH_CALLED = 'FETCH_CALLED';
export const FETCH_RETURNED = 'FETCH_RETURNED';
export const SERVER_ERROR = 'SERVER_ERROR';
export const ADD_CALLED = 'ADD_CALLED';
export const ADD_RETURNED = 'ADD_RETURNED';
export const DELETE_CALLED = 'DELETE_CALLED';
export const DELETE_RETURNED = 'DELETE_RETURNED';
export const EDIT_CALLED = 'EDIT_CALLED';
export const EDIT_RETURNED = 'EDIT_RETURNED';
export const ADD_ETGOHOME = 'ADD_ETGOHOME';
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
    // console.log('newNote:',newNote)
    const promise = axios.post('http://localhost:3333/api/notes', newNote);
    return function(dispatch) {
        dispatch({ 
            type: ADD_CALLED, 
        })
        promise
            .then(response => {
                dispatch({ 
                    type: ADD_RETURNED,
                    payload: response 
                })
                // alert();
                history.push('/');
            })
            .catch(err => {
                dispatch({ 
                    type: SERVER_ERROR, 
                    payload: ['ERROR-axios:', err] 
                })
            })
    }
}

export const deleteNote = (id) => {
    // alert(id);
    const promise = axios.delete(`http://localhost:3333/api/notes/${id}`);
    return function(dispatch) {
        dispatch({ 
            type: DELETE_CALLED 
        });
        promise
            .then(response => {
                dispatch({
                    type: DELETE_RETURNED,
                    payload: response.data
                    }
                );
                const resStatus = new Response().status;
                const resText = new Response().statusText;
                alert(`DELETION SUCCESSFUL!\n\nid:${id}\nResponse: ${resStatus} - ${resText}`);
                history.push('/');
            })
            .catch(err => {
                dispatch({ 
                    type: SERVER_ERROR, 
                    payload: ['ERROR-axios:', err] 
                    }
                );
                console.log(err);
                alert(`error: this entry not found\n\nid:${id}`);
                history.push('/');
                //calling fetchData() below
                window.location.reload();
            })
            
        }
}

export const editData = (changedNote) => {
    // console.log('changedNote:',changedNote)
    const promise = axios.put(`http://localhost:3333/api/notes/${changedNote.id}`, changedNote);
    return function(dispatch) {
        dispatch({ 
            type: EDIT_CALLED, 
        })
        promise
            .then(response => {
                // console.log('here',response);
                dispatch({ 
                    type: EDIT_RETURNED,
                    payload: (
                        response.data                        
                    )
                });
                // console.log(response)
                alert('edit success');
                history.push('/');
            })
            .catch(err => {
                dispatch({ 
                    type: SERVER_ERROR, 
                    payload: ['ERROR-axios:', err] 
                })
                console.log(err);
                alert('error');
            })
    }
}

