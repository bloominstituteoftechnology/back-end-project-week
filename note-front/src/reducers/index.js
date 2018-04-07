import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import { notesReducer } from "./notesReducer";
import { noteReducer } from "./noteReducer";
import AuthReducer from "./auth";

const rootReducer = combineReducers({
  form: FormReducer,
  auth: AuthReducer,
  notesReducer,
  noteReducer
});

export default rootReducer;
