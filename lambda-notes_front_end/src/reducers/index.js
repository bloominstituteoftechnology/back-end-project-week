import { noteReducers } from './NoteReducers';
import { toggleReducers } from './ToggleReducers';
import { userReducers } from './UserReducers';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    notes: noteReducers,
    toggle: toggleReducers,
    users: userReducers
})
