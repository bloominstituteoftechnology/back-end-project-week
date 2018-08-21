import {
   CREATING_USER,
   USER_CREATED,
   REGISTER_FAILED,
   LOGGING_IN,
   LOGGED_IN,
   LOGIN_FAILED
} from './../actions';

const initialState = {
    username: '',
    password: '',
    loggingIn: false,
    loggedIn: false,
    creatingUser: false,
    userCreated: false,
    error: null
}

export const userReducers = (state=initialState, {type, payload}) => {
    switch (type) {
        case CREATING_USER:
            return {...state, creatingUser: true}
        case USER_CREATED:
            return {...state, creatingUser: false, userCreated: true}
        case REGISTER_FAILED:
            return {...state, creatingUser: false, error: payload}
        case LOGGING_IN:
            return {...state, loggingIn: true}
        case LOGGED_IN:
            return {...state, loggingIn: false, loggedIn: true}
        case LOGIN_FAILED:
            return {...state, loggingIn: false, error: payload}
        default:
        return state;
    }
} 


