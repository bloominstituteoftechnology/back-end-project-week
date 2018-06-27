import axios from "axios";

export const PENDING_NOTES = "PENDING_NOTES";
export const SUCCESS_NOTES = "SUCCESS_NOTES";
export const ERROR_NOTES = "ERROR_NOTES";
/*
   C - addNote
   R - getNotes
   U - updateNote
   D - deleteNote
*/
export const fetchNotes = () => {
    const notes = axios.get("http://localhost:5000/notes");
    return dispatch => {
        dispatch({ type: PENDING_NOTES });
        notes
            .then(response => {
                console.log(response);
                dispatch({ type: SUCCESS_NOTES, payload: response.data });
            })
            .catch(response => {
                dispatch({ type: ERROR_NOTES, payload: response.data });
            });
    };
};

export const addNote = data => {
    const notes = axios.post("http://localhost:5000/notes", data);
    return dispatch => {
        dispatch({ type: PENDING_NOTES });
        notes
            .then(response => {
                console.log(response);
                dispatch({ type: SUCCESS_NOTES, payload: response.data });
            })
            .catch(response => {
                dispatch({
                    type: ERROR_NOTES, payload: [{
                        title: "error: " + data.title,
                        content: "error: " + data.content
                    }]
                });
            });
    };
};

export const removeNote = _id => {
    const notes = axios.delete(`http://localhost:5000/notes/${_id}`);
    return dispatch => {
        dispatch({ type: PENDING_NOTES });
        notes
            .then(response => {
                dispatch({ type: SUCCESS_NOTES, payload: response.data });
            })
            .catch(response => {
                dispatch({ type: ERROR_NOTES, payload: response.data });
            });
    };
}

export const editNote = (_id, noteObj) => {
    const notes = axios.put(`http://localhost:5000/friends/${_id}`, noteObj);
    return dispatch => {
        dispatch({ type: PENDING_NOTES });
        notes
            .then(response => {
                console.log(response);
                dispatch({ type: SUCCESS_NOTES, payload: response.data });
            })
            .catch(response => {
                dispatch({ type: ERROR_NOTES, payload: response.data });
            });
    };
}



// import { v4 } from 'node-uuid';
// export const ADD_NOTE = 'ADD_NOTE';
// export const EDIT_NOTE = 'EDIT_NOTE';
// export const REMOVE_NOTE = 'REMOVE_NOTE';

// export const addNote = note => {
//     return {
//         type: ADD_NOTE,
//         payload: {
//             id: v4(),
//             title: note.title,
//             body: note.body,
//             createdAt: Date.now()
//         }
//     };
// };

// export const editNote = (note) => {
//     return {
//         type: EDIT_NOTE,
//         payload: {
//             id: note.id,
//             title: note.title,
//             body: note.body,
//             createdAt: note.createdAt
//         }
//     };
// };

// export const removeNote = (id) => {
//     return {
//         type: REMOVE_NOTE,
//         payload: id
//     };
// };