// import axios from 'axios';

export const NOTEADDED = 'NOTEADDED';
export const NOTEUPDATED = 'NOTEUPDATED';
export const NOTEDELETED = 'NOTEDELETED';

export const LOGGEDIN = 'LOGGEDIN';
export const LOGGEDOUT = 'LOGGEDOUT';


export const addNote = note => {
    return {
        type: NOTEADDED,
        payload: note
    }
}

export const updateNote = note => {
    return {
        type: NOTEUPDATED,
        payload: note
    }
}

export const deleteNote = id => {
    return {
        type: NOTEDELETED,
        payload: id
    }
}

export const loggedIn = () => {
    return {
        type: LOGGEDIN
    }
}

export const loggedOut = () => {
    return {
        type: LOGGEDOUT
    }
}
// export const GETTINGNOTES = 'GETTINGNOTES';
// export const NOTESRECEIVED = 'NOTESRECEIVED';

// export const ADDINGNOTE = 'ADDINGNOTE';

// export const UPDATINGNOTE = 'UPDATINGNOTE';

// export const DELETINGNOTE = 'DELETINGNOTE';

// export const ERROR = 'ERROR';


// actions for when the server is set up

// const url = 'url goes here'

// export const getNotes = () => {
//     return dispatch => {
//     dispatch({type: GETTINGNOTES})
//     axios.get(url)
//     .then(response => {dispatch({type: NOTESRECEIVED, payload: response.data})})
//     .catch(error => {dispatch({type: ERROR, payload: error})});
//     }
// }

// export const addNote = note => {
//     return dispatch => {
//         dispatch({type: ADDINGNOTE})
//         axios.post(url, note)
//         .then(response => {dispatch({type: NOTEADDED, payload: response.data})})
//         .catch(error => {dispatch({type: ERROR, payload: error})});
//     }
// }

// export const updateNote = (note, id) => {
//     return dispatch => {
//         dispatch({type: UPDATINGNOTE})
//         axios.put(`${url}/${id}`)
//         .then(response => {dispatch({type: NOTEUPDATED, payload: response.data})})
//         .catch(error => {dispatch({type: ERROR, payload: error})});
        
//     }
// }

// export const deleteNote = (note, id) => {
//     return dispatch => {
//         dispatch({type: DELETINGNOTE})
//         axios.delete(`${url}/${id}`)
//         .then(response => {dispatch({type: NOTEDELETED, payload: response.data})})
//         .catch(error => {dispatch({type: ERROR, payload: error})});
//     }
// }