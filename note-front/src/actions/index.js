import notesData from '../notesData.js';

export const RECIEVING_NOTES = 'RECIEVING_NOTES';
export const NOTES_RECEIVED = 'NOTES_RECEIVED';
export const CREATING_NOTE = 'CREATING_NOTE';
export const NOTE_CREATED = 'NOTE_CREATED';
export const ERROR = 'ERROR';
export const DELETING_NOTE = 'DELETING_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const UPDATING_NOTE = 'UPDATING_NOTE'; 
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const TOGGLE_UPDATE_NOTE = 'TOGGLE_UPDATE_NOTE';
export const SINGLE_NOTE = 'SINGLE_NOTE';

// using local data, would use axios to get, post, put, and delete
let theNotes = notesData.slice();

const keyGenerator = user => {
  return user + new Date().getTime();
}

export const getNotes = () => {
  var notes = new Promise(function(resolve, reject) {
    resolve(console.log(" "));
  });
    return dispatch => {
      dispatch({ type: RECIEVING_NOTES });
      notes
        .then(() => {
          dispatch({ type: NOTES_RECEIVED, payload: theNotes });
        })
        .catch(err => {
          dispatch({ type: ERROR, payload: err });
        });
    };
}

export const createNote = note => {
  const newNote = new Promise(function(resolve, reject) {
    resolve(
      note.id = keyGenerator(note.user)
    );
  });
  return dispatch => {
    dispatch({ type: CREATING_NOTE });
    newNote
      .then(() => {
        console.log("in actions => NOTES CREATED: ", theNotes);
        dispatch({ type: NOTE_CREATED, payload: note });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};


export const deleteNote = (id, notes) => {
  var deletedNote = new Promise(function(resolve, reject) {
    let newNotes = notes.filter(note => {
      return id !== note.id;
    });
    theNotes = newNotes;
    resolve(theNotes);
  });
  return dispatch => {
    dispatch({ type: DELETING_NOTE });
    deletedNote
      .then((data) => {
        dispatch({ type: DELETE_NOTE, payload: data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};


export const updateNote = updates => {
  var updatedNote = new Promise(function(resolve, reject) {
    let updatedNote = {id: updates.id, title: updates.title, text: updates.text, user: updates.user };
    let currentNotes = updates.notes.notes;
    let updateIndex = currentNotes.findIndex(note => note.id === updatedNote.id);
    currentNotes.splice(updateIndex, 1, updatedNote);
    resolve(currentNotes);
  });
  return dispatch => {
    dispatch({ type: UPDATING_NOTE });
  updatedNote
      .then((data) => {
        dispatch({ type: UPDATE_NOTE, payload: data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
    };
  };
  


  export const toggleShowUpdate = () => {
  return {
    type: TOGGLE_UPDATE_NOTE
  };
};

export const updateSingleNote = note => {
  return {
    type: SINGLE_NOTE,
    payload: note
  };
};

