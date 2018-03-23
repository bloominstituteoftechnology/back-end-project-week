import { combineReducers } from 'redux';
import { reducer } from './reducers';
import { filterReducer } from './filterReducer';

const rootReducer = combineReducers({ reducer, filterReducer });

// const rootReducer = (state, action) => {
//   if (action.type === 'SIGNOUT') {
//     return (state = undefined);
//   }
//   return appReducer(state, action);
// };

export default rootReducer;
