import {
    combineReducers
} from 'redux';
import noteReducer from './note';
import userReducer from './user';

export default combineReducers({
    user: userReducer,
    note: noteReducer
});
// export default reducer;