import { combineReducers } from "redux";
import { reducer } from "./reducers";
import { filterReducer } from "./filterReducer";

const rootReducer = combineReducers({ reducer, filterReducer });

export default rootReducer;
