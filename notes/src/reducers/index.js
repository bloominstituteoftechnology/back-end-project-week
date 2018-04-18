import { combineReducers } from 'redux';
import authReducer from './auth';
import notesReducer from './notes';

const rootReducer = combineReducers({
	auth: authReducer,
	notes: notesReducer
});

export default rootReducer;
