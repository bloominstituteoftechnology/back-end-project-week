import {
  FETCHING_NOTES, FETCHED_NOTES, ERROR_FETCHING_NOTES
} from "../actions";

const initialState = [{ //we put all these cuz thats how we set up our server
  requestedUser: {
    notes: [
      {
        
      }
    ],
    _id: '',
    username: '',
    __v: 0
  }
}]


export const notesReducer = (notes = initialState, action) => {
  switch (action.type) {
    case FETCHING_NOTES:
     return [{
       requestedUser: {
         notes: [
           {
            title: 'fetching title...',
            content: 'fetching content...'
           }
         ],
         _id: '',
         username: '',
         __v: 0
       }
     }]
    case FETCHED_NOTES:
      return [action.payload]
    default:
      return notes;
  }
};
