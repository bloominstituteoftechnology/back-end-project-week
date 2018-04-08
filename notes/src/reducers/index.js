import { combineReducers } from 'redux';
import { notes_reducer } from './notes_reducer';
import { users_reducer } from './users_reducer';

export default combineReducers({
    notes_reducer,
    users_reducer,
});
