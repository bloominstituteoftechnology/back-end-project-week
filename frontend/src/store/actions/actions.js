import axios from 'axios';
export const GETTING_NOTES = 'GETTING_NOTES';
export const RECEIVED_NOTES = 'RECEIVED_NOTES';
export const ADDING_NOTE = 'ADDING_NOTE';
export const NOTE_ADDED = 'NOTE_ADDED';
export const DELETING_NOTE = 'DELETING_NOTE';
export const NOTE_DELETED = 'NOTE_DELETED';
export const UPDATING_NOTE = 'UPDATING_NOTE';
export const UPDATED_NOTE = 'UPDATED_NOTE';
export const BY_TAG = 'BY_TAG';
export const BY_TEXT = 'BY_TEXT';
export const ADD_USER = 'ADD_USER';
export const VALIDATE = 'VALIDATE';
export const SIGNOUT = 'SIGNOUT';

const getUrl = 'http://localhost:8080/notes';
const postUrl = 'http://localhost:8080/notes';
let config = {
  headers: { Authorization: localStorage.getItem('Authorization') }
};

export const getNotes = id => {
  return dispatch => {
    const getConfig = { ...config, params: { id } };
    dispatch({ type: GETTING_NOTES });
    axios
      .get('/notes', getConfig)
      .then(({ data }) => {
        dispatch({ type: RECEIVED_NOTES, payload: data });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const addNote = newNote => {
  return dispatch => {
    dispatch({ type: ADDING_NOTE });
    axios
      .post('/notes', newNote, config)
      .then(({ data }) => {
        dispatch({ type: NOTE_ADDED, payload: data });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const deleteNote = id => {
  const deleteUrl = `http://localhost:8080/notes/delete/${id}`;
  console.log({ deleteUrl });
  return dispatch => {
    dispatch({ type: DELETING_NOTE });
    axios
      .delete(`/notes/delete/${id}`, config)
      .then(({ data }) => {
        dispatch({ type: NOTE_DELETED, payload: data });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getSingleNote = id => {
  const url = `http://localhost:8080/notes/${id}`;
  return dispatch => {
    axios
      .get(`/notes/${id}`, config)
      .then(({ data }) => {
        dispatch({ type: RECEIVED_NOTES, payload: data });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const updateNote = note => {
  const id = note._id;
  const url = `http://localhost:8080/notes/${id}`;
  return dispatch => {
    dispatch({ type: UPDATING_NOTE });
    console.log({ FrontNote: note });
    axios
      .put('/notes/${id}', { data: { note } }, config)
      .then(({ data }) => {
        dispatch({ type: UPDATED_NOTE, payload: data });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const filterByText = text => {
  return dispatch => {
    axios
      .get(getUrl)
      .then(({ data }) => {
        data = data.filter(note => {
          const newLength = text.length;
          const noteTitle = note.title.toLowerCase();
          if (noteTitle.substring(0, newLength) === text) {
            return note;
          }
          return undefined;
        });
        dispatch({ type: RECEIVED_NOTES, payload: data });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const filterByTag = tag => {
  return dispatch => {
    axios
      .get(getUrl)
      .then(({ data }) => {
        data = data.filter(note => {
          if (note.tag.toString() === tag) {
            return note;
          }
          return undefined;
        });
        dispatch({ type: RECEIVED_NOTES, payload: data });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const addUser = (email, password) => {
  const addUserUrl = 'http://localhost:8080/user/new';
  return dispatch => {
    axios
      .post('/user/new', { email, password })
      .then(({ data }) => {
        dispatch({ type: ADD_USER, payload: data._id });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const login = (email, password) => {
  const checkUserUrl = 'http://localhost:8080/user/login';
  const token = localStorage.getItem('Authorization');
  return dispatch => {
    if (token) {
      axios
        .post('/user/login', { token })
        .then(({ data }) => {
          config = {
            headers: { Authorization: localStorage.getItem('Authorization') }
          };
          dispatch({ type: VALIDATE, payload: data._id });
        })
        // .then(reload => {
        //   window.location.reload();
        // })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .post('/user/login', { email, password })
        .then(({ data }) => {
          window.localStorage.setItem('Authorization', data.token);
          config = {
            headers: { Authorization: localStorage.getItem('Authorization') }
          };
          dispatch({ type: VALIDATE, payload: data._id });
        })
        // .then(reload => {
        //   window.location.reload();
        // })
        .catch(err => {
          console.log(err);
        });
    }
  };
};

export const signout = () => {
  return dispatch => {
    config = {};
    window.localStorage.removeItem('Authorization');
    dispatch({ type: SIGNOUT });

    setTimeout(function() {
      window.location.href = '/';
    }, 500);
  };
};
