import authReducer from "./authReducer";
import noteReducer from "./noteReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  note: noteReducer
});

export default rootReducer
