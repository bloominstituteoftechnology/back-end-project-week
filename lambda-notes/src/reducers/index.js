import { combineReducers } from 'redux';
import { notesReducer } from './notesReducer';
import { noteReducer } from './noteReducer';
import AuthReducer from './auth';
import { reducer as FormReducer } from 'redux-form';
import UsersReducer from './users';

export default combineReducers({
	note: noteReducer,
	notes: notesReducer,
	auth: AuthReducer,
	form: FormReducer,
	users: UsersReducer
});