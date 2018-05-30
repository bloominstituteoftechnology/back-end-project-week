import axios from 'axios';
export const FETCHNOTES = 'FETCHNOTES';
export const ERR = "ERR";

export const fetchStuff = () => {
    return dispatch => {
        axios.get(`https://lambda-notes-brandon.herokuapp.com/notes`)
        .then(response => {
            dispatch({ type: FETCHNOTES, payload: response.data})
        })
        .catch(error => {
            dispatch({ type: ERR })
        })
    }
}
export const saveData = note => {
    return dispatch => {
    axios
    .post(`https://lambda-notes-brandon.herokuapp.com/notes`, note) 
    .then(response => {
        dispatch({ type: FETCHNOTES, payload: response.data})
    })
    .catch(error => {
      console.log(error);
    });
}
}
export const deleteNote = id => {
    return dispatch => {
    axios
    .delete(`https://lambda-notes-brandon.herokuapp.com/notes/${id}`)
    .then(response => {
        dispatch({ type: FETCHNOTES, payload: response.data})
        // console.log('what')
    })
    .catch(err => {
      console.log(err);
    });
    }
}
export const editNotes = note => {
    return dispatch => {
        axios.put(`https://lambda-notes-brandon.herokuapp.com/notes/${note._id}`, note)
        .then(response => {
            console.log(response)
            dispatch({ type: FETCHNOTES, payload: response.data})
        })
        .catch(error => {
            dispatch({ type: ERR })
        })
    }
}
