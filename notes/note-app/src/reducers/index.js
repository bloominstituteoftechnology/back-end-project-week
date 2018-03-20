import { combineReducers } from 'redux';
import AuthReducer from './authentication';
import { reducer as FormReducer } from 'redux-form';
import UsersReducer from './users';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  users: UsersReducer,
});

export default rootReducer;

// import * as actionType from '../actions';

// // const initialState = {
// // 	users: [
// // 		{
// // 			username: '',
// // 			password: '',
// // 		},
// // 	],
// // 	user: [],
// // 	isLoggedIn: false,
// // 	notes: [],
// // 	error: '',
// // };

// const initialState = {
//   id: 5,
//   user: '',
//   isLoggedIn: false,
//   isAuthenticating: false,
//   isSigningUp: false,
//   notes: [],
//   error: '',
// };

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case actionType.SIGNUP_USER_START:
//       return {
//         ...state,
//         isSigningUp: true,
//       };

//     case actionType.SIGNUP_USER_SUCCESS:
//       // check if user exists (in database)
//       // if (action.payload.username === '')
//       //   return {
//       //     ...state,
//       //     isSigningUp: false,
//       //     error: 'Please enter a username',
//       //   };

//       // if (action.payload.password === '')
//       //   return {
//       //     ...state,
//       //     isSigningUp: false,
//       //     error: 'Please enter a password',
//       //   };

//       // // ******************************************
//       // // ** DO NOT STORE PASSWORDS AS PLAIN TEXT **
//       // // ******************************************
//       // localStorage.setItem(
//       //   'notes-app-id-1941293123912',
//       //   JSON.stringify(action.payload),
//       // );
//       // // ******************************************
//       // // ** DO NOT STORE PASSWORDS AS PLAIN TEXT **
//       // // ******************************************

//       return {
//         ...state,
//         user: action.payload,
//         isLoggedIn: true,
//       };

//     case actionType.SIGNUP_USER_FINISH:
//       return {
//         ...state,
//         isSigningUp: false,
//       };

//     case actionType.CHECK_LOGIN_START:
//       return {
//         ...state,
//         isAuthenticating: true,
//       };

//     case actionType.CHECK_LOGIN:
//       if (action.payload.username === '')
//         return {
//           ...state,
//           isLoggedIn: false,
//           error: 'Please enter a username',
//         };

//       if (action.payload.password === '')
//         return {
//           ...state,
//           isLoggedIn: false,
//           error: 'Please enter a password',
//         };

//       let error = '';
//       let isLoggedIn = false;
//       let addUserToLoggedIn = null;
//       const userExists = state.users.filter(
//         user => user.username === action.payload.username,
//       );

//       if (userExists.length > 0) {
//         if (userExists[0].password !== action.payload.password) {
//           error = 'Wrong password. Please try again';
//         } else {
//           isLoggedIn = true;

//           // ******************************************
//           // ** DO NOT STORE PASSWORDS AS PLAIN TEXT **
//           // ******************************************
//           localStorage.setItem(
//             'notes-app-id-1941293123912',
//             JSON.stringify(action.payload),
//           );
//           // ******************************************
//           // ** DO NOT STORE PASSWORDS AS PLAIN TEXT **
//           // ******************************************

//           addUserToLoggedIn = userExists[0].username;
//         }
//       } else error = 'Username not found. Please try again';

//       if (isLoggedIn)
//         return {
//           ...state,
//           user: [...state.user, addUserToLoggedIn],
//           isLoggedIn: isLoggedIn,
//           error: error,
//         };
//       else
//         return {
//           ...state,
//           isLoggedIn: isLoggedIn,
//           error: error,
//         };

//     case actionType.CHECK_LOGIN_FINISH: {
//       return {
//         ...state,
//         isAuthenticating: false,
//       };
//     }

//     case actionType.RESET_ERROR:
//       return {
//         ...state,
//         error: '',
//       };

//     case actionType.SIGN_OUT:
//       return {
//         ...state,
//         user: state.user.filter(user => user.username === action.payload),
//         isLoggedIn: false,
//       };

//     case actionType.ADD_NOTE:
//       return {
//         ...state,
//         notes: [...state.notes, { id: state.id++, ...action.payload }],
//       };

//     case actionType.EDIT_NOTE:
//       return {
//         ...state,
//         notes: state.notes.map(note => {
//           if (note.id === action.payload.id) {
//             note.title = action.payload.title;
//             note.text = action.payload.text;
//           }

//           return note;
//         }),
//       };

//     case actionType.DELETE_NOTE:
//       return {
//         ...state,
//         notes: state.notes.filter(note => note.id !== action.payload),
//       };

//     case actionType.DELETE_NOTES_ALL:
//       return {
//         ...state,
//         notes: [],
//       };

//     default:
//       return state;
//   }
// };

// export default rootReducer;
